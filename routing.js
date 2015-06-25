


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