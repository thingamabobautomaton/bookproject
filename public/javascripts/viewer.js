var viewer = (function() {
    'use strict';



    //public namespace
    var Viewer = {};

    var book;

    var content = $('#content');
    content.on('click', '.btn', function (event) {
        event.preventDefault();
        Viewer.render(this.id);
    });

    /*
    //public namespace
    var User = {};

    //this properly private stuff.

    var privateVar = 'No peeking!';

    function privateFunc() {
        return 'All hidden away.';
    }

    //attach public stuff to User
    User.publicVar = 'Look at me!';

    User.publicFunc = function publicFunc(){
        return privateVar;
    };

     //export public stuff
     return Viewer;
    */
    function createRow(entry){
        return (
            '<div class="row">' +
                '<div class="col-md-6 col-md-offset-3 text-justify">' +
                    entry +
                '</div>' +
            '</div>'
        );
    }
    function renderText(entry){
        var text = '<p>' + entry.text + '</p>';
        return createRow(text);
    }
    function renderTitle(entry){
        var text = '<h3>' + entry.title + '</h3>';
        return createRow(text);
    }
    function renderPicture(entry){

        var picture = '<img class="img-responsive" src="' + entry.picture + '">';
        return createRow(picture);
    }
    function renderChoice(entry){
        var choice = '<button id="' + entry.go + '" class="btn btn-default btn-block btn-multiline">' + entry.choice + '</button>';
        return createRow(choice);
    }

    function render(entry) {
        var type = _.keys(entry)[0];
        var element = {
            title:      function(){ return renderTitle(entry)},
            text:       function(){ return renderText(entry)},
            picture:    function(){ return renderPicture(entry)},
            choice:     function(){ return renderChoice(entry)}
        };
        return element[type] ? element[type]() : console.log('ERROR: no such type!');
    }
    Viewer.saveBook = function(file){
      book = file;
    };

    Viewer.render = function(sectionName){
        var section = book[sectionName];
        content.empty();
        _.forEach(section, function(entry){
            content.append(render(entry));
        })
    };

    //export public stuff
    return Viewer;
}());

function loadBook( title , callback){
    $.get( "/books/" + title )
        .done(function (res) {
            book = YAML.parse(res);
            callback(book);
        })
        .fail(function() {
            return 'failed to get the book ' + title;
        });
}

$(window).ready(function () {
    var title = 'the-view';
    loadBook( title, function(book){
        viewer.saveBook(book);
        viewer.render('cover');
    });

});