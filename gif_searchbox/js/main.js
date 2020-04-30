document.querySelector('.js-go').addEventListener('click', function(){
    var content = getUserInput();
    searchGiphy(content);
});

document.querySelector('.js-userinput').addEventListener('keyup', function(e){
    if (e.which===13){
        var content = getUserInput();
        searchGiphy(content);
    };
});

function pushToDOM(input){
    var response = JSON.parse(input);
    var gifURL = response.data;
    
    gifURL.forEach(function(img){
        var src = img.images.fixed_height.url;
        console.log(src)

        var container = document.querySelector('.js-container');
        container.innerHTML += "<img src=\""+ src +"\" class=\"container-image\">";
    });
};

function getUserInput(){
    var content = document.querySelector('.js-userinput').value;
    return content;
};

function searchGiphy(query){
    var url = 'http://api.giphy.com/v1/gifs/search?q=\''+ query +'\'&api_key=dc6zaTOxFJmzC&limit=24&rating=r';

    //AJAX Request
    var giphyAjaxCall = new XMLHttpRequest();
    giphyAjaxCall.open('GET', url);
    giphyAjaxCall.send();

    giphyAjaxCall.addEventListener('load', function(e){
    var data = e.target.response;
    //console.log(data);
    pushToDOM(data);
    });
};