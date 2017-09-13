
Chat Widget
-------------------
A simplified customizable and easily embeddable chat UI for chat bot solutions.

Usage
----------
It is very simple to integrate into any website.

> **Add the below scripts and a stylesheet in the head of your website**
```
<link href="https://singara-velan.github.io/chat-widget/chat-widget-style.css" rel="stylesheet" />

<script src="https://singara-velan.github.io/chat-widget/chat-plugin.js"></script>
```
**If your site already having Jquery, below reference not required**
```
<script src="https://singara-velan.github.io/chat-widget/lib/jquery-3.2.1.slim.min.js"></script>
```

> **Add the below script in the html and script in body for testing**
```
<div class="chatroot"></div>
```
```
var chat = $('#chatroot').chatwidget({
   username: 'Singa',
   uid: '12377',
   messageOut: msgOut
})

// calls everytime user sends/responds in the chat
function msgOut(data) {
	console.log(data);
}
```
```
 // way to push bot/agents messages into the chat.
  $('#chatroot').chatwidget.messageIn(payload);
  payload: {
	  msg: 'hey, how are you!',
      timestamp: 'date time'
  }
```

### Documentation

### Initialization

> **With Default Options**
```
$('#chatroot').chatwidget();
```
> **With Custom Options**
```
$('#chatroot').chatwidget(options);

options = {
	username: 'Singa',
    uid: '12377',
    messageOut: msgOut
};
```
### Options

List of supported options.

| Option | Description| Sample data|
| :------- | ----: | :---: |
| username | The name of your agent/bot |  `Help Desk`|
| avatarImgSource| face for your agent/bot |  http://supporthelpdesk.co/norton/img/banner-img-girl.png`   
|
| uId| chat id    | `123889` |
|welcomeMessage| Auto greeting message for new users. | `Hi, how may i assist you!` |
|sessionTimeout| If the chat is idle for "sessionTimeout" duration, chat session will end. | `30` mins. default value.
|messageOut| call back function. will be called everytime users sends/responds in chat | `function msgOut(payload){}`

### Communication: IN & OUT
This section explains, how we can establish the communication between chat bot/agent with the site visitor/user.

Chat widget exposes two methods.

 1. **messageOut** 

 It is a callback function. Has to be passed as part of options. The widget will call this function every time the user sends a message with a **payload**.

    If call back function not passed, user responses will be assigned in a window object as **window.messageOut**

 2.  **messageIn**
 
 It is a method, needs to be called with a **payload**, a message object.  
`$('#chatroot').chatwidget.messageIn(payload);`

> **Payload**
> it is a json object with the following properties. 
> ``` {
	msg: 'message string',
	timestamp: 'time which will be displayed under each message'
	   }
 ```
