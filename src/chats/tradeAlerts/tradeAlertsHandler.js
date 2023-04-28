function tradeAlertsHandler(sock) {
    return function (event) {
        const { message, date } = event.message;

        console.log('From Trade Alerts')
        console.log('Recieved at', new Date().toLocaleString(), '|', 'Posted at', new Date(date * 1000).toLocaleString());
        console.log(message);
        const msgToSend = `TA%% ${message.date} # ${message}`;
        sock.send(msgToSend);
    }
}

export {
    tradeAlertsHandler,
};