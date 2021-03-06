(function () {
    'use strict'

    // widget script starts here;

    var mountEl = $('#chatroot'), // a div with id='chatroot' is required to bootstrap the chat widget.
        chatbubbleContainerEl, chatWindowContainerEl, clearEl, chatSectionContainerEl,
        chatWelcomeContainerEl,
        chatSvg, avatarImgUrl = 'http://supporthelpdesk.co/norton/img/banner-img-girl.png',
        username = 'velan',
        uId = 'chatFi',
        chatHS;

    if (mountEl.length == 0) {
        console.log("root element not found to bootstrap");
        return;
    }

    // svg image inside of chat bubble
    chatSvg = '<div class="section"><svg class="chat-interfaceIconFillColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M0 0h24v24H0V0z" fill="none"></path>' +
        '<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"></path>' +
        '</svg></div>'

    // chat bubble dom with styling classes.
    chatbubbleContainerEl = $('<div id="chatbubble" class="chat-bubble-container chat-bg online active" />');

    chatbubbleContainerEl.append(chatSvg);

    // chat welcome container
    chatWelcomeContainerEl = $('<article id="chatWelcomeContainer" class="chat-welcome-container">');
    chatWelcomeContainerEl.append(createWelcomeSection());

    function createWelcomeSection() {
        var section = $('<section>'),
            msg, reply, inputEl;
        section.append('<div id="wlclose" class="wlc-close">');
        msg = $('<div class="wlcMsg">');
        section.append(msg);
        reply = $('<div class="reply">');
        inputEl = $('<input id="welMsg" type="text" placeholder="Write Reply">');
        inputEl.on('keypress', function (e) {
            if ((e.keyCode || e.which) == 13) {
                sendChat($(this).val());
                $(this).val("");
                hidePrompt();
                toggleChat();
            }
        });
        reply.append(inputEl);
        reply.append('<span class="send">');
        section.append(reply);
        return section;
    }

    //chat window container
    chatWindowContainerEl = $('<article id="chatwindow" class="chat-window-container">');
    clearEl = $('<div class="clear">');
    chatWindowContainerEl.append(createHeaderEl(), createMessageSection(), createFooterEl());

    function createHeaderEl() {
        var header = $('<header>')
        var avatarEl = '<img src="' + avatarImgUrl + '"/>';
        var avatarContainerEl = $('<div class="avatar">').append(avatarEl);
        var avatarlTitleEl = '<div class="u-name">' + username + '</div>';
        var actionsContainerEl = $('<div class="actions">');
        actionsContainerEl.append('<img id="resize" class="resize" alt="full screen img" src="data:image/png;base64,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" />')
        actionsContainerEl.append('<div id="closeBtn" class="close">');

        header.append(avatarContainerEl, avatarlTitleEl, actionsContainerEl, clearEl);
        return header;
    }

    function createMessageSection() {
        chatSectionContainerEl = $("<section id='chatSection'>");

        return chatSectionContainerEl;
    }

    function createMessages(data) {
        var msgContainerEl = $('<div class="msg">');
        if (data.type === 'in') {
            var msgOutContainerEl = $('<div class="msg-in">');
            msgOutContainerEl.append('<div><span class="tail-container"></span></div>');
            msgOutContainerEl.append(createMessageDataEl(data));
            msgContainerEl.append(msgOutContainerEl);

        } else if (data.type === 'out') {
            var msgOutContainerEl = $('<div class="msg-out">');
            msgOutContainerEl.append('<div><span class="tail-container"></span></div>');
            msgOutContainerEl.append(createMessageDataEl(data));
            msgContainerEl.append(msgOutContainerEl);
        }

        chatSectionContainerEl.append(msgContainerEl);
    }

    function createMessageDataEl(data) {
        var dataEl = '<div class="bubble">' +
            '<div class="msg-text">' + data.msg + '</div>' +
            '<div class="msg-metadata"><span>' + data.timestamp + '</span></div>' +
            '</div>';
        return dataEl;
    }

    function createFooterEl() {
        var footerEl = $('<footer>'),
            inputEl;
        footerEl.append('<div class="smily">');
        inputEl = $('<input id="inMsg" type="text" placeholder="send message" class="message-type">');
        inputEl.on('keypress', function (e) {
            if ((e.keyCode || e.which) == 13) {
                sendChat($(this).val());
                $(this).val("");
            }
        });
        footerEl.append(inputEl);
        return footerEl;
    }

    function loadChatHistory(uId) {
        var data = localStorage.getItem('sweeChatHS');
        if (data) {
            data = JSON.parse(data);
            if (data.chatId == uId) {
                chatHS = data;
                data.msgs.forEach(function (val) {
                    createMessages(val);
                });
                scrollDown();
                if (data.msgs.length === 0) {
                    showPrompt();
                }
            } else {
                initChatHistory(uId);
                console.log("Provided chat id and stored chat session id is mismatching. So started new Session");
            }
        } else {
            initChatHistory(uId);
            console.log('doesn"t having chat history in session. Started new Session.');
        }

    }

    function initChatHistory(uId) {
        var objHS = {
            chatId: uId,
            msgs: []
        }
        localStorage.setItem('sweeChatHS', JSON.stringify(objHS));
        showPrompt();
    }

    function updateChatHistory(msg) {
        var objHS = localStorage.getItem('sweeChatHS');
        if (objHS) {
            objHS = JSON.parse(objHS);
            if (objHS.msgs && objHS.msgs.length >= 0) {
                objHS.msgs.push(msg);
            } else {
                objHS.msgs = [msg];
            }
            localStorage.setItem('sweeChatHS', JSON.stringify(objHS));
        }
    }

    function sendChat(msg) {
        var date = new Date();
        var payload = {
            'type': 'out',
            'msg': msg,
            'timestamp': date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
        }
        msgOut(payload);

    }

    function scrollDown() {
        setTimeout(function () {
            $(chatSectionContainerEl).scrollTop(chatSectionContainerEl[0].clientHeight + chatSectionContainerEl[0].scrollHeight);
        }, 100)
    };

    mountEl.append(chatbubbleContainerEl, chatWelcomeContainerEl, chatWindowContainerEl);

    // dom managing events

    function toggleChat() {
        $('#chatbubble').toggleClass('active');
        $('#chatwindow').toggleClass('active');
        $('#chatwindow').removeClass('full');
    }

    function showPrompt() {
        $('#chatWelcomeContainer').addClass('active');
        $('#chatwindow').removeClass('active');
        $('#chatbubble').removeClass('active');
    }

    function hidePrompt() {
        $('#chatWelcomeContainer').removeClass('active');
        $('#chatbubble').addClass('active');
    }

    $("#chatbubble, #closeBtn").on('click', function (event) {
        toggleChat();
    });
    $("#resize").on('click', function (event) {
        $('#chatwindow').toggleClass('full');
    });

    $('#wlclose').on('click', function (event) {
        hidePrompt();
    });

    loadChatHistory(uId);

    // public methods

    function msgIn(payload) {
        payload.type = 'in';
        createMessages(payload);
        updateChatHistory(payload);
        scrollDown();
        if(!$('#chatwindow').hasClass('active')){
            toggleChat();
        }
    }

    function msgOut(payload) {
        payload.type = 'out';
        createMessages(payload);
        updateChatHistory(payload);
        scrollDown();
        window.messageOut = payload;
    }


    window.messageIn = msgIn;
    
})()