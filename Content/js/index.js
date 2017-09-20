$(function () {

    var chat = $.connection.chatHub;

    var username;

    do {
        username = prompt("Ingrese nombre de usuario (< 5)");
    } while (username == null || username == "" || username.length > 5);

    chat.client.updateUsers = function (userCount, userList) {
        $('#onlineUsersCount').text('Usuarios: ' + userCount);
        $('#userList').empty();
        userList.forEach(function (username) {
            $('#userList').append('<div>' + username + '</div>');
        });
    }

    chat.client.broadcastMessage = function (username, message) {
        $('#messagesArea').append('<div><strong>' + username + '</strong>: ' + message +'</div>');
    }

    chat.client.broadcastDocText = function (text) {
        $('#userDoc').text(text);
    }


    $.connection.hub.start().done(function () {
        chat.server.connect(username);
    });
    
    function sendMessage() {
        var message = $('#userMessage').val();

        if (message.length < 1)
            return;

        chat.server.send(message);
        $('#userMessage').val("");
    }

    function sendDocText() {
        var text = $('#userDoc').val();        
        chat.server.sendTextDoc(text);
    }


    $('#btnSendMessage').click(function(){
        sendMessage();
    });

    $('#userMessage').keypress(function (e) {
        if (e.which === 13) {
            sendMessage();
        }
    });
    
    $('#userDoc').keypress(function (e) {
        sendDocText();
    });

    $('#userDoc').keyup(function (e) {
        sendDocText();
    });

});

