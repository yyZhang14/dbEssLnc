# dbEssLnc
A essential lncRNA database.
## Intruduction

We store some essential lncRNAs information in a MySQL database. We used the node.js script engine and javaScript from the
Express framework to implement the backend system. The frontend was implement using JavaScript with the Vue framework. We 
developed this object on **the Windows 10 platform** using the code editor Visual Studio Code(https://code.visualstudio.com/).


### Development

If you want to run this code in your development environment,you should first install **Node.js**(https://nodejs.org/en/download/) and **MySQL** (https://www.mysql.com/downloads/) on your machine. 

After your Node.js environment and MySQL are ready, find out the location of your unpacked dbesslnc source code, and execute the command `npm install` separately to install all the dependencies of the project.

### Add SQL file to the database

Firstly, you should create a database. Then, add data to the database after loading SQL file dbesslnc.sql


### Start frontend

Go to the root directory of the project, and execute the command `npm run serve`. 



### Start backend

Go to the root directory of the project,and enter **server** directory , then execute the command `nodemon index.js` or `node index.js` to start backend service.Finally, Type `http://localhost:port` in the browser, will see the website.

## Production
If you want to deploy the project to your own server when there are no problems in the development environment, you would need to execute `npm run build` in the root directory to get the `dist` folder firstly. And then configure the running environment on the server.

## Steps for production

1.Install **Node.js** and **MySQL** on the server. <br>
2.Create a database and add data to the database by loading SQL file **dbesslnc.sql**. <br>
3.Create a new directory (e.g. dbesslnc) on the server. <br>
4.Upload the `dist` folder, `server` folder and `package.json file` and `package-lock.json` to `dbesslnc` directory.  <br>
5.Execute the command `npm install` to install all the dependencies in the `dbesslnc` directory. <br>
6.Install and configure **Nginx**, start nginx service. <br>
7.You can install **PM2** to manage your node process.  <br>
8.Type and execute the command `pm2 start index.js` in the `server` folder to start the project.<br>
