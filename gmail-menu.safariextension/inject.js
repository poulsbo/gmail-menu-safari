function gmail_this(urlPolicy)
{
    var url = location.href;
    if (urlPolicy == 'cleanUrl') {
        var m = /^https?:\/\/[a-z0-9_]+\.youtube\.com\/watch\?v=([^&]+)/i.exec (url);
        if (m) {
            url = 'http://youtu.be/' + m[1];
        }
        else {
            url = url.replace(/[?].*/, '');
        }
    }
    url = url.replace(/.+\/chrome\/#\/a\/http:/, 'http:');

    var body = '';
    if (document.selection)
        body = document.selection.createRange().text;
    else if (window.getSelection)
        body = window.getSelection();
    else if (document.getSelection)
        body = document.getSelection();

    body = '' + body;
    if (body.length)
        body = '"' + body + '" (From: ' + url + ')';
    else {
        var intro = ['Check out: ', 'Take a look at: ', 'Interesting: ', 'Worth reading: ', 'What do you think: ', 'Worth a look: '];
        body = intro[Math.floor(Math.random() * intro.length)] + url;
    }

    var subj = document.title;
    if (subj == 'The New York Times') {
        var title = document.getElementById('articleTitle');
        if (title)
            subj = title.firstChild.innerText;
    }

    var gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body) + '&zx=AINSDAIHCZ&shva=1&disablechatbrowsercheck=1&ui=1';
    var gmailWin = window.open(gmailUrl);
}

function handleMessage(event)
{
    var messageName = event.name;
    var messageData = event.message;
    if (messageName === "gmailThis") {
	if (window === window.top) {
            urlPolicy = messageData;
            gmail_this(urlPolicy);
	}
    }
}

safari.self.addEventListener("message", handleMessage, false);
