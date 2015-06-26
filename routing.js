var Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "c:/uploads"})]
});
FS.HTTP.setBaseUrl('/files');

if (Meteor.isServer) {
    var Busboy = Npm.require("busboy");

    Router.onBeforeAction(function (req, res, next) {
        var files = []; // Store files in an array and then pass them to request.
        var image = {}; // crate an image object

        if (req.method === "POST") {
            var busboy = new Busboy({ headers: req.headers });
            busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
                image.mimeType = mimetype;
                image.encoding = encoding;
                image.filename = filename;

                // buffer the read chunks
                var buffers = [];

                file.on('data', function(data) {
                    buffers.push(data);
                });
                file.on('end', function() {
                    // concat the chunks
                    image.data = Buffer.concat(buffers);
                    // push the image object to the file array
                    files.push(image);
                });
            });

            busboy.on("field", function(fieldname, value) {
                req.body[fieldname] = value;
            });

            busboy.on("finish", function () {
                // Pass the file array together with the request
                req.files = files;
                next();
            });
            // Pass request to busboy
            req.pipe(busboy);
        }
        else{
            this.next();
        }
    });
}

Router.route('/upload',function(){

        var files = this.request.files;
        var res = this.response;
        var newFile = new FS.File();

        newFile.attachData(files[0].data, {type: files[0].mimeType},function(err){
            newFile.name(files[0].filename);

            Images.insert(newFile, function (err, fileObj) {
               while(fileObj.url()==null);
                var resp = {
                    files: [{url: fileObj.url()}]
                };

                res.end(JSON.stringify(resp));
            });
        });

}, {where: 'server'});

Router.route('/',{
    path:'/',
    template:'edit_post',
        onBeforeAction: function(){
            var A= IRLibLoader.load('/bower_components/jquery/dist/jquery.min.js');
            var B = IRLibLoader.load('/bower_components/medium-editor/dist/js/medium-editor.min.js');

            if(A.ready() && B.ready()){
                var C = IRLibLoader.load('/bower_components/handlebars/handlebars.runtime.min.js');
                var D = IRLibLoader.load('/bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js');
                var E = IRLibLoader.load('/bower_components/blueimp-file-upload/js/jquery.iframe-transport.js');
                var F = IRLibLoader.load('/bower_components/jquery-sortable/source/js/jquery-sortable-min.js');

                if( D.ready() && E.ready() && C.ready() ) {
                    var G = IRLibLoader.load('/bower_components/blueimp-file-upload/js/jquery.fileupload.js');

                    if (G.ready()) {
                        var L = IRLibLoader.load('/bower_components/medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.min.js');
                        if(L.ready()){
                            this.next();
                        }
                    }
                }
            }
        }
    }
);