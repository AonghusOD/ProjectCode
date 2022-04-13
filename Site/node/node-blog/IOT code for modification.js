// https://medium.com/dev-jam/getting-started-with-aws-iot-core-and-mqtt-protocol-with-a-node-js-example-ed16bd542704
// npm install aws-iot-device-sdk
// https://github.com/aws/aws-iot-device-sdk-js

const awsIot = require('aws-iot-device-sdk');

const device = awsIot.device({
    clientId: 'ESP32_DATA', //AonghusMQTTClient  Your own device name . . . whatever you like
    host: 'a8p9udme32jcv-ats.iot.eu-west-1.amazonaws.com', // your IOT setup
    port: 8883,
    keyPath: './certificates/cb200e58a2a2c0207863b7399b96b9f94c483151025c093179680a23bd02184c-private.pem.key', // put these files in same directory as this file
    certPath: './certificates/cb200e58a2a2c0207863b7399b96b9f94c483151025c093179680a23bd02184c-certificate.pem',
    caPath: './certificates/AmazonRootCA1.pem',
});

function sendData(topicName, data) {
    console.log("STEP - Sending data to AWS  IoT Core: " + JSON.stringify(data))
    console.log("---------------------------------------------------------------------------------")
    return device.publish(topicName, JSON.stringify(data)) //  "signInEtc" in the topic
}

// We connect our client to AWS  IoT core. 
device
    .on("connect", function () {
        console.log("STEP - Connecting to AWS  IoT Core");
        console.log("---------------------------------------------------------------------------------")
        device.subscribe("esp32/pub");
      //  sendData("signInEtcTopic", {connectStatus: "node.js is connected"})
    });

// Set handler for the device, it will get the messages from subscribers topics.
device
    .on("message", function (topic, payload) {
        console.log('message', topic, payload.toString());
    });

device
    .on("error", function (topic, payload) {
        console.log('Error:', topic, payload.toString());
    });
