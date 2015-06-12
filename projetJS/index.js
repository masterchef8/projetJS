/**
 * Created by Somebody on 03/06/15.
 *
 *
 *       - Votre application doit permettre de saisir l’URL d’un podcast,
 *       - d’afficher le contenu de ce podcast sous une forme ergonomique,
 *       - avec notamment la liste des entrées par ordre chronologique inverse (plus récents en haut),
 *       - avec la possibilité de lire (dans la même page) le contenu multimédia d’une entrée (mais pas plusieurs à la fois).
 *       - Autant que possible, l’état de l’application doit se réfléter dans l’URL, afin de pouvoir revenir rapidement sur un état mémorisé.
 *       - Vous fournirez également une documentation utilisateur minimale, accessible depuis l’application.
 *
 * ---------------------EN PLUS----------------------------------------------------------------------------------------
 * TODO: - afficher le contenu de plusieurs podcats
 * TODO: - programmer une liste de lecture
 * TODO: - marquer les entrées déjà lues
 * TODO: - mémoriser l’état dans le navigateur (local storage)
 * ---------------------ENCORE PLUS------------------------------------------------------------------------------------
 * TODO: - Transformer l'app JS en méteor
 * TODO: - CSS avec bootstrap
 *
 */

/**
 * Global
 */
currentMedia = "";

function addTab(tab, i, title, pub, guid) {
    /**

     [Log] C'est mon boulot 14.05.2015
     [Log] http://www.radiofrance.fr/
     [Log] durée : 00:01:31 - C'est mon boulot - par : Philippe DUPORT
     [Log] Thu, 14 May 2015 06:27:00
     [Log] http://media.radiofrance-podcast.net/ ...

     */

    var table = document.getElementById(tab);
    var row = table.insertRow(i);
    var conca = "<audio controls=" + "controls" + " onplay=" + "checkPlay(this);" + " preload=" + "none" + " src=" + guid + "></<audio>";
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell5 = row.insertCell(2);

    // Add some text to the new cells:
    cell1.innerHTML = conca;
    cell2.innerHTML = title;
    cell5.innerHTML = pub;

}
function addHead(channel) {
    var t = channel.getElementsByTagName("title")[0].textContent;
    var tP = document.getElementById("titrePod");
    tP.value = t;

    var d = channel.getElementsByTagName("description")[0].textContent;
    var dC = document.getElementById("descriptionContent");
    dC.value = d;
}

function checkPlay(audio) {
    /**
     * Check si Un element audio est en train de jouer un son.
     * Si oui => pause sinon play.
     */
    var tagsAudio = document.getElementsByTagName('audio');
    var i = 0;
    while (i < tagsAudio.length) {
        if (tagsAudio[i] !== audio && !tagsAudio[i].paused) {
            tagsAudio[i].pause();
        }
        i++;
    }
    audio.play();
}
function recupXML(xhr) {

    var root = xhr.responseXML;
    var channel = root.getElementsByTagName('channel')[0];
    var item = channel.getElementsByTagName('item');

    for (var i = 0; i < item.length; i++) {
        var title = item[i].getElementsByTagName('title')[0].textContent;
        var link = item[i].getElementsByTagName('link')[0].textContent;
        var pub = item[i].getElementsByTagName('pubDate')[0].textContent;
        var guid = item[i].getElementsByTagName('guid')[0].textContent;
        addTab("tab", i + 1, title, pub, guid);
    }

    addHead(channel);

}
function xhrFunc(url){
    proxy = "http://cors-anywhere.herokuapp.com";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', proxy + "/" + url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            if (xhr.status === 200) {
                recupXML(xhr,url);
            } else {
                // Error
            }
        }
    };
    xhr.send();
}

window.addEventListener("load", function () {

    var inputUrl = document.getElementById("url");
    if(location.hash != "" && location.hash != undefined){
        var url = location.hash.replace("#","");
        inputUrl.value = location.hash.replace("#","");
        xhrFunc(url);
    }

        document.getElementById("submit")
        .addEventListener("click", function () {

            console.log("clicked");
            var url = document.getElementById("url").value.replace("http://", "");
            location.hash = url;
            console.log(url);
            proxy = "http://cors-anywhere.herokuapp.com";

            xhrFunc(url);

        });
});

window.addEventListener("hashchange", function() {
    console.log("HashChange EventListener");


});

