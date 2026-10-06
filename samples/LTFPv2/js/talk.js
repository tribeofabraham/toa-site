
$(document).ready(function () {
    var talkString = '';
    var talkArray = [];
    function talk() {
        talkArray = [];
        $('.lt').each(function (e) {
            var tileTarget = $(this).attr('id') + ' .ltSub00';
            var tileText = $('#' + tileTarget).html();
            talkArray.push({
                gc: $(this).attr('gc'),
                body: tileText
            });
        });
        //sort here
        var sorted = false;
        while (!sorted) {
            sorted = true;
            for (i=0; i<talkArray.length-1; i++) {
                if (parseInt(talkArray[i].gc) > parseInt(talkArray[i+1].gc )) {
                    //flip
                    sorted=false;
                    tgc =talkArray[i].gc;
                    tbody = talkArray[i].body;

                    talkArray[i].gc = talkArray[i+1].gc;
                    talkArray[i].body = talkArray[i+1].body;

                    talkArray[i+1].gc = tgc;
                    talkArray[i+1].body = tbody;
                }
            }
        }


        console.log(talkArray);
        talkString = '';
        for (i=0; i<talkArray.length; i++) {
            talkString += talkArray[i].body;
        }
        console.log(talkString);
        const text = talkString;
    
        if (!text) {
            alert('Please enter some text.');
            return;
        }
    
        if (!voiceId) {
            alert('Voice ID is not set.');
            return;
        }
    
        const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`;
    
        $('#generate').prop('disabled', true).text('Generating...');
    
        $.ajax({
            url: apiUrl,
            method: "POST",
            headers: {
                "xi-api-key": apiKey,
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                text: text,
                voice_settings: {
                    stability: 0.75,
                    similarity_boost: 0.75
                }
            }),
            xhrFields: {
                responseType: 'blob' // Important for handling binary data
            },
            success: function (blob) {
                const url = URL.createObjectURL(blob);
                $('#audioPlayer').attr('src', url).show();
                var player = $('#audioPlayer').get(0);
                player.play();
            },
            error: function (xhr) {
                console.error('Error:', xhr);
                alert('An error occurred: ' + (xhr.responseJSON?.error || xhr.responseText || 'Unknown error'));
            },
            complete: function () {
                $('#generate').prop('disabled', false).text('Generate Audio');
            }
        });
    }


    const apiKey = ""; // Never put a real key here: this file is public. Generating audio needs a server-side proxy that keeps the key.
    let voiceId = null;

    // Fetch available voices
    $.ajax({
        url: "https://api.elevenlabs.io/v1/voices",
        method: "GET",
        headers: {
            "xi-api-key": apiKey
        },
        success: function (response) {
            if (response.voices && response.voices.length > 0) {
                // Use the first available voice ID
                voiceId = response.voices[0].voice_id;
            } else {
                alert('No voices available.');
            }
        },
        error: function (xhr) {
            console.error('Error fetching voices:', xhr);
            alert('Failed to fetch voices.');
        }
    });
    $('.talk').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            talk();
        }
    });

    $('.talk').bind('click', function (e) {
        talk();

    });
});