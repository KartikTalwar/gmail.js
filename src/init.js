if(top.document == document) {

    var load_script = function(path) {
        var script = document.createElement('script');
        script.src = path;
        document.getElementsByTagName('body')[0].appendChild(script);
    }

    load_script(chrome.extension.getURL("jquery.1.10.2.min.js"));
    load_script(chrome.extension.getURL("gmail.js"));

}