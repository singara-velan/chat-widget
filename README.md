# chat-widget

# add below references in head 

    <link href="https://singara-velan.github.io/chat-widget/chat-widget-style.css" rel="stylesheet" />
    <script src="https://singara-velan.github.io/chat-widget/lib/jquery-3.2.1.slim.min.js"></script>
    <script src="https://singara-velan.github.io/chat-widget/chat-plugin.js"></script> 

# add below code in your body

 <div id="chatroot"></div>

    <script>
        var chat = $('#chatroot').chatwidget({
            username: 'Singa',
            uid: '12377',
            messageOut: msgOut
        })

        function msgOut(data) {
            console.log(data);
        }

    </script>

# Documentation

# Initialization:

    with default settings:

    $('#chatroot').chatwidget();

    with custom settings:

    $('#chatroot').chatwidget(options);

    options = {
        username: 'Singa',
        uid: '12377',
        messageOut: msgOut
    }

    option parameters:

    1. username --> it wil be show up in the chat window.
    2. uid --> unique id. Responsible for session maintanence.
    3. messageOut --> call back function. will be called everytime sends a message.
    4. avatarImgSource --> agent/bot image 
    5. 