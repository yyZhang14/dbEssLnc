# dbEssLnc: A manually curated database of human and mouse essential lncRNA genes
We manually curated 206 essential lncRNAs from literatures for establishing a database on essential lncRNAs, which is named as dbEssLnc (Database of essential lncRNAs). The dbEssLnc database has a web-based user-friendly interface for the users to browse, to search, to visualize and to blast search the records in the database. The dbEssLnc database is freely accessible at https://esslnc.pufengdu.org. 
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
![Alt text](https://github.com/yyZhang14/dbEssLnc/blob/main/public/md/node.png)
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

![Alt text](https://github.com/yyZhang14/dbEssLnc/blob/main/public/md/mysql.PNG)

### 2.3 Install Blast
Visit Blast.ncbi(https://blast.ncbi.nlm.nih.gov/Blast.cgi) to download the Blast installer.
```
# create fasta sequence database
makeblastdb -in lncrna.fasta -dbtype nucl
# a test to use blast tool
blastn -query tar.fasta -db blast/lncrna/lncrna.fasta -out a.txt -evalue 1e-5 -outfmt 6
```

### 2.4 Start frontend

Go to the root directory of the project, and execute the command `npm run serve`. 
![Alt text](https://github.com/yyZhang14/dbEssLnc/blob/main/public/md/fonter.PNG)

### 2.5 Start backend

Go to the root directory of the project,and enter **server** directory , then execute the command `nodemon index.js` or `node index.js` to start backend service.Finally, Type `http://localhost:3000` in the browser, will see the website.

![Alt text](https://github.com/yyZhang14/dbEssLnc/blob/main/public/md/ser.PNG)

## 3.Production
If you want to deploy the project to your own server when there are no problems in the development environment, you would need to excute npm run build in the root directory to get the **dist** folder firstly. And then configure the running environment on the server.
### Steps for production
1. Install Node.js and MySQL on the server.
2. Install BLAST on the server.
```
# Download blast source
wget https://ftp.ncbi.nlm.nih.gov/blast/executables/blast+/LATEST/ncbi-blast-2.12.0+-x64-linux.tar.gz
# Unzip folder
tar -zxvf ncbi-blast-2.12.0+-x64-linux.tar.gz
mv ncbi-blast-2.12.0+ blast+
# View the current path and configure environment variables
pwd
export PATH=/home/user024/blast+/bin:$PATH
source ~/.bashrc
# Make the configuration take effect
blastn -version
```
3. Create a database and add data to the database by loading SQL file.

```
# some commands for import sql file
create database dbesslnc；
use dbesslnc；
source sqlpath(eg. /home/yyzhang/dbesslnc.sql)；
show databases;
show tables;
```
4. Create a new directory (e.g. dbEssLnc) on the server.
5. Use Xftp software to upload the **dist** folder, **server** folder , **blast** folder and package.json file to dbEssLnc directory.
![Alt text](https://github.com/yyZhang14/dbEssLnc/blob/main/public/md/ftp.PNG)
6. Execute the command `npm install` to install all the dependencies in the dbEssLnc directory.
7. Install and configure Nginx. Please pay special attention to path and configuration of the **nginx.conf** file(Nginx.conf is given above).
![Alt text](https://github.com/yyZhang14/dbEssLnc/blob/main/public/md/nginx.PNG)
test nginx use following command.
```
nginx -t
service nginx restart
```
8. You can install PM2 to manager your node process.
9. Type and execute the command `pm2 start index.js` in the server folder to start the project.Open your browser, type in the domain name, and you will see the website.
![Alt text](https://github.com/yyZhang14/dbEssLnc/blob/main/public/md/pm2.PNG)
![Alt text](https://github.com/yyZhang14/dbEssLnc/blob/main/public/md/bro.PNG)
### 
## Citation
Zhang YY, Zhang WY, Xin XH, Du PF. dbEssLnc: A manually curated database of human and mouse essential lncRNA genes. Comput Struct Biotechnol J. 2022 May 23;20:2657-2663. doi: 10.1016/j.csbj.2022.05.043. PMID: 35685362; PMCID: PMC9162909.
