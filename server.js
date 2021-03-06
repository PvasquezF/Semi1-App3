var PROTO_PATH = __dirname + '/hello.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function sayHello(call, callback) {
    console.log("entra: " + call.request.name)
    callback(null, {
        message1: call.request.name,
        message2: ''
    });
}

function main() {
    var server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, { sayHello: sayHello });
    server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
    server.start();
}
main();