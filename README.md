# dbEssLnc

## Intruduction

We store some essential lncRNAs information in a MySQL database. We used the node.js script engine and javaScript from the
Express framework to implement the backend system. The frontend was inplement using JavaScript with the Vue framework. We 
developed this object on the Windows platform using the code editor Visual Studio Code.


### Development

If you want to run this code in your development environment,you should first install **Node.js**(https://nodejs.org/en/download/) and **MySQL** (https://www.mysql.com/downloads/) on your machine. 

After your Node.js environment and MySQL are ready, find out the location of your unpacked dbMisloc source code, and execute the command `npm install` separately to install all the dependencies of the project.

### Add SQL file to the database

Firstly, you should create a database. Then, add data to the database after loading SQL file dbesslnc.sql


### Start frontend

Go to the root directory of the project, and execute the command `npm run serve`. 



### Start backend

Go to the root directory of the project,and enter **server** directory , then execute the command `nodemon index.js` or `node index.js` to start backend service.Finally, Type `http://localhost:port` in the browser, will see the website.
