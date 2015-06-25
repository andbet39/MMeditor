/**
 * Created by andrea.terzani on 24/06/2015.
 */
Template.edit_post.rendered= function(){
    editor = new MediumEditor('.editable', {});

    $('.editable').mediumInsert({
        editor: editor
    });
};