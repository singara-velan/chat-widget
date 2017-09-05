(function () {
    'use strict'

    function toggleChat() {
        $('#chatbubble').toggleClass('active');
        $('#chatwindow').toggleClass('active');
        $('#chatwindow').removeClass('full');
    }

    $("#chatbubble, #closeBtn").on('click', function (event) {
        toggleChat();
    });
    $("#resize").on('click', function (event) {
        $('#chatwindow').toggleClass('full');
    });
})()