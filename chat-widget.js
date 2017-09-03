(function(){
    'use strict'
    function toggleChat(){
        $('#chatbubble').toggleClass('active');
        $('#chatwindow').toggleClass('active');
    }

    $("#chatbubble, #closeBtn").on('click', function(event){
        toggleChat();
    });
})()