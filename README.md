# dbEssLnc: A manually curated database of human and mouse essential lncRNA genes
We manually curated 200 essential lncRNAs from literatures for establishing a database on essential lncRNAs, which is named as dbEssLnc (Database of essential lncRNAs). The dbEssLnc database has a web-based user-friendly interface for the users to browse, to search, to visualize and to blast search the records in the database. The dbEssLnc database is freely accessible at https://esslnc.pufengdu.org. 
## 1.Intruduction

We store some essential lncRNAs information in a MySQL database. We used the node.js script engine and javaScript from the
Express framework to implement the backend system. The frontend was implement using JavaScript with the Vue framework. We 
developed this object on **the Windows 10 platform** using the code editor Visual Studio Code(https://code.visualstudio.com/).


## 2.Development

### 2.1 Installing dependency packages
If you want to run this code in your development environment,you should first install **Node.js**(https://nodejs.org/en/download/) and **MySQL** (https://www.mysql.com/downloads/) on your machine. The **node** version used for this project is v14.17.1 and the **npm** version is v7.18.1.The versions used had better be consistent, otherwise unexpected errors will occur.
After your Node.js environment is ready, find out the location of your unpacked dbesslnc source code, and execute the command `npm install` separately to install all the dependencies of the project.
If the download speed of individual dependencies is too slow, users can also download **cnpm** and 
use `cnpm i` download.
```powershell
node -v
npm -v
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm -v
npm install /cnpm i
```

### 2.2 Add SQL file to the database

After downloading mysql services,Users can download MYSQL Workbench software to import SQL files **dbesslnc** into the database. Note that the encoding format of the database is UTF8. There are 6 tables in the database dbesslnc, 
which are final,vital,tumor,cancer,trans,expression respectively.
```
final table: all essential gene information.
vital table: all general lncRNA information.
tumor table: all tumor suppressor gene information.
cancer table: all oncogene information.
trans table: all gene transcript information.
expression table: all lncRNA expression profile information.
```

！[Alt text](/public/md/mysql.PNG)



### 2.3 Start frontend

Go to the root directory of the project, and execute the command `npm run serve`. 
![2][https://github.com/yyZhang14/dbEssLnc/blob/main/public/md/fonter.PNG]

### 2.4 Start backend

Go to the root directory of the project,and enter **server** directory , then execute the command `nodemon index.js` or `node index.js` to start backend service.Finally, Type `http://localhost:3000` in the browser, will see the website.

![3][https://github.com/yyZhang14/dbEssLnc/blob/main/public/md/ser.PNG]

