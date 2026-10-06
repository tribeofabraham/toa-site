     let vid;
  $(document).ready(function () {
  //-----------------------
    // AWS integration layer
    var configElement = document.getElementById('media-player-config');

 

    if (configElement) {
        let config = JSON.parse(configElement.textContent);
        vid = config.objectId;
        /*
        Initialization of demo video
        const player = dashjs.MediaPlayer().create();
        player.initialize(
            document.getElementById("video1"),
            'https://media.reallygreatreading.com/object-link/' + vid + '/raw.mpd',
            true);
         */

    } else {
        vid = urlParams.get('v');
    }
    //-----------------------
});
