const net = require('net');
const client = net.createConnection({
    host: '127.0.0.1',
    port: 8088
}, () => {
    // 'connect' listener.
    console.log('connected to server!');
    // let request = new Request({
    //     method: "POST",
    //     host: "127.0.0.1",
    //     port: "8088",
    //     path: '/',
    //     body: {
    //         name: "Jorge"
    //     },
    //     headers: {
    //         ["x-foo2"]: "ddw"
    //     }
    // })
    // console.log(request.toString())
    // client.write(request.toString());
    client.write('POST / HTTP/1.1\r\n');
    client.write('Host: 127.0.0.1\r\n');
    client.write('Content-Type: application/x-www-form-urlencoded\r\n');
    client.write('Content-Length: 10\r\n');
    client.write('\r\n');
    client.write('name=Jorge');
});
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
});