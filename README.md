# MERN Stack Application 
## Enviroment Monitor System 
![Architecture Diagram](https://github.com/AonghusOD/ProjectCode/blob/master/Diagrams/Poster.png)

The scope of the project was mainly focused on deploying a full-stack web application using the MERN stack and using embedded C/C++ to write the code for ESP32.

Aim was to monitor and regulate various environment variables, such as temperature, humidity, light, air and water. This is achieved by reading data from sensors on embedded system inside a grow area. Data is sent to a database where user can view via web browser.

On the frontend, React was used with Next.js framework that provides faster rendering, server-side rendering, built-in CSS, better image optimization, and API support.

Node.js was used as middleware on the backend. Express server-side framework ran inside here too for URL routing and handling HTTP requests and responses.

![AWS Diagram](https://github.com/AonghusOD/ProjectCode/blob/master/Diagrams/UML%20State%20Diagram%20AWS.png)

ESP32 publishes an MQTT message to a topic on AWS IOT Core. Node.js is subscribed to the topic and saves incoming data to the Mongo DB database. The web application receives data from the database using Nodejs and an API. Data is then displayed on a web page.

# Getting Started
