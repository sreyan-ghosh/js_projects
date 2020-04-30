/* 1. Search bar */

var UI = {};

UI.handleEnterPress = function(){
    document.querySelector('.js-search').addEventListener('keypress', function(e){
        if (e.which===13){
            var inputValue = e.target.value;
            SoundCloudAPI.getTrack(inputValue);
        };
    });
};

UI.handleSubmitRequest = function(){
        document.querySelector('.js-submit').addEventListener('click', function(){       
        var inputValue = document.querySelector('.js-search').value;
        SoundCloudAPI.getTrack(inputValue);
    });
};

UI.handleEnterPress();
UI.handleSubmitRequest();

/* 2. Querying Soundcloud API */

var SoundCloudAPI = {};

SoundCloudAPI.init =  function(){
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
};

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue){
    SC.get('/tracks', {
        q: inputValue
    }).then(function(tracks) {
        console.log(tracks);
        SoundCloudAPI.renderTracks(tracks);
    });
};

SoundCloudAPI.getTrack = function(inputValue){
    return SC.get('/tracks/', {
        q: inputValue
    }).then(function(tracks){
        console.log(tracks);

        var searchResult = document.querySelector('.js-search-results');
        searchResult.innerHTML = '';

        SoundCloudAPI.renderTracks(tracks, searchResult);
    });
};

/* 3. Display Cards */ 

SoundCloudAPI.renderTracks = function(tracks, searchResult){

    tracks.forEach(function(track){
        
        var card = document.createElement('div');
        card.classList.add('card');

        var imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        var image_img = document.createElement('img');
        image_img.classList.add('image_img');
        image_img.src = track.artwork_url || 'https://picsum.photos/100/100';

        imageDiv.appendChild(image_img);

        var content = document.createElement('div');
        content.classList.add('content');

        var header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = '<a href="'+ track.permalink_url +'" target="_blank">'+ track.title +'</a>';

        content.appendChild(header);

        searchResult.appendChild(content);

        var button = document.createElement('div');
        button.setAttribute('data-id', track.id);
        button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

        var icon = document.createElement('i');
        icon.classList.add('add', 'icon');

        var buttonText = document.createElement('span');
        buttonText.innerHTML = 'Add to Playlist';

        button.appendChild(icon);
        button.appendChild(buttonText);

        button.addEventListener('click', function(){
            SoundCloudAPI.getEmbed(track.uri);
        });

        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(button);

        searchResult.appendChild(card);
    });
};

SoundCloudAPI.getEmbed = function(trackURL){
        SC.oEmbed(trackURL, {
        auto_play: true
    }).then(function(oEmbed){
        console.log('oEmbed response: ', oEmbed);

        var sidebar = document.querySelector('.col-left');
        
        var box = document.createElement('div');
        box.innerHTML = oEmbed.html;

        sidebar.insertBefore(box, sidebar.firstChild);

        localStorage.setItem("key", sidebar.innerHTML);

        var SCWidget = SoundCloudAPI.getWidget(embed.childNodes[0]);

        SCWidget.bind('finish', function(){
            alert('Finished');
        });

        SCWidget.bind('play', function(){
            var widgetIndex = Array.from(sidebar.childNodes).indexOf(embed);
        });
    });
};

SoundCloudAPI.getWidget = function(embedElement){
    return SC.Widget(embedElement);
}

var sidebar = document.querySelector('.js-playlist');
sidebar.innerHTML = localStorage.getItem("key");