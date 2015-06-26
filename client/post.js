/**
 * Created by andrea.terzani on 24/06/2015.
 */
var editor;

Template.edit_post.rendered= function(){
    editor = new MediumEditor('.editable', {});

    $(function () {
        $('.editable').mediumInsert({
            editor: editor,
            addons: {
                images: {
                    fileUploadOptions:{
                        url: 'upload',
                        acceptFileTypes: /(.|\/)(gif|jpe?g|png)$/i
                    }
                }
            }
        });
    });
};

Template.edit_post.events({
    'click .save-button':function(event){
        //event.preventDefault();
        var edit =  editor.serialize();

        console.log(edit);
    }

});