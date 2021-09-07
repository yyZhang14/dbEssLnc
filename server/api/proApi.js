var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");
// var path = require("path");
var exec = require('child_process').exec;
let randomStr = require('string-random'); 
var fs = require("fs");
// import cookies from "vue-cookies";
// var cookies = require("vue-cookies")


//blast的一些路径
const BLASTDB = ""
const tempPath_query = "/Users/zyy/Desktop/code/ES-test/blast/temp/"
const tempPath_result= "/Users/zyy/Desktop/code/ES-test/blast/temp/" 
const db_path = "/Users/zyy/Desktop/code/ES-test/blast/lncrna/lncrna.fasta"
const {MYSQL_CONFIG} = require('../db.js');
// var blast = require("../blast.js")
//创建连接
var connection = mysql.createConnection(MYSQL_CONFIG);
//连接数据库
connection.connect();

// 将数据转换为json格式
var jsonWrite = function(res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: "1",
      msg: "操作失败"
    });
  } else {
    res.json(ret);
  }
};
//browser 页面的sql语句
// 关键lncRNA /NCBI
router.post("/lncrna", (req, res) => {
  var sql = $sql.property.selectLncRNA;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM essential ERROR]:", err.msg);
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result);
    }
  });
});
//organism is human
router.post("/selectHuman", (req, res) => {
  var sql = $sql.property.selectHuman;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM essential  where organism is human ERROR]:", err.msg);
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result);
    }
  });
});
//organism is mouse
router.post("/selectMouse", (req, res) => {
  var sql = $sql.property.selectMouse;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM essential  where organism is mouse ERROR]:", err.msg);
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result);
    }
  });
});
//NONCODEId is not null
router.post("/selectNCBI", (req, res) => {
  var sql = $sql.property.selectNCBI;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM essential  where NCBI_gene_Id is not null ERROR]:", err.msg);
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result);
    }
  });
});
router.post("/selectNONCODE", (req, res) => {
  var sql = $sql.property.selectNONCODE;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM essential  where NONCODEId is not null ERROR]:", err.msg);
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result);
    }
  });
});
// 参考文献
router.post("/references", (req, res) => {
  var sql = $sql.property.references;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("[get references error]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
      console.log(res);
    }
  });
});

//搜索页面 sql语句
router.post("/searchHuman",(req,res)=> {
  var sql=$sql.property.searchHuman;
  var proName = req.body;
  connection.query(sql,[proName.inputContent],(err,result)=>{
    if(err) {
      console.log("search essential table where Organism ='human' error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/searchMouse",(req,res)=> {
  var sql=$sql.property.searchMouse;
  var proName = req.body;
  connection.query(sql,[proName.inputContent],(err,result)=>{
    if(err) {
      console.log("search essential table where Organism ='mouse' error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/searchNCBI",(req,res)=> {
  var sql=$sql.property.searchNCBI;
  var proName = req.body;
  connection.query(sql,[proName.inputContent],(err,result)=>{
    if(err) {
      console.log("search essential table by NCBI_gene_Id error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/searchNONCODE",(req,res)=> {
  var sql=$sql.property.searchNONCODE;
  var proName = req.body;
  connection.query(sql,[proName.inputContent],(err,result)=>{
    if(err) {
      console.log("search essential table by NONCODEId error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})
//模糊查询推荐输入
router.post("/fuzzyHuman",(req,res)=> {
  var sql=$sql.property.fuzzyHuman;
  connection.query(sql,(err,result)=>{
    if(err) {
      console.log("select Name from `essential` where Organism ='human' error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/fuzzyMouse",(req,res)=> {
  var sql=$sql.property.fuzzyMouse;
  connection.query(sql,(err,result)=>{
    if(err) {
      console.log("select Name from `essential` where Organism ='mouse' error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/fuzzyNCBI",(req,res)=> {
  var sql=$sql.property.fuzzyNCBI;
  connection.query(sql,(err,result)=>{
    if(err) {
      console.log("select Name from `essential` where Organism is not null error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/fuzzyNONCODE",(req,res)=> {
  var sql=$sql.property.fuzzyNONCODE;
  connection.query(sql,(err,result)=>{
    if(err) {
      console.log("select Name from `essential` error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})



router.post("/blast",(req,res)=>{

  if(
      typeof req.body.user_seq == "undefined"
      ||typeof req.body.user_eValue == "undefined"
      ||typeof req.body.user_wordSize == "undefined"
      ){
        res.status(400);
        res.send({
          error:true,
          message:"post参数缺失（user_seq,user_eValue)"
        })
      }
      else{
        let inputFile = randomStr();
        let outputFile = randomStr();
        // let inputFile = "in";
        // let outputFile = "out";
        // // console.log(res.cookies)
        // let inputFile;
        // let outputFile;
        // if(req.cookies.input == null){
        //   console.log("cookies")
          // inputFile = randomStr();
          // outputFile = randomStr();
        //   res.cookies("input",inputFile,{maxAge:900000,httpOnly:true})
        //   res.cookies("output",outputFile,{maxAge:900000,httpOnly:true})
        // }else{
        //   inputFile = req.cookies.input;
        //   outputFile = req.cookies.output;
        // }

        // 将前端的请求序列存在文件中
        var user_seq = req.body.user_seq;
        var user_wordSize = req.body.user_wordSize.toString();
        var user_eValue = req.body.user_eValue.toString();

        var path_query = tempPath_query + inputFile + '.fasta';
        var path_result = tempPath_result + outputFile + '.txt';

        fs.writeFileSync(path_query, user_seq); 
        fs.writeFileSync(path_result,"");   
        // 调用命令行测试

        var cmd = BLASTDB+' blastn -query '+path_query+
                  ' -out '+path_result+
                  ' -db '+db_path+
                  ' -outfmt "6 qseqid sseqid pident length evalue bitscore "'+
                  ' -evalue '+user_eValue+
                  ' -word_size '+user_wordSize;
        // console.log(cmd)
        exec(cmd, function(error, stdout, stderr) {
          // 读取测试结果
          let data = fs.readFileSync(path_result, "utf8").split('\n'); 
          console.log(data)

          // 发送给前端
            res.send({
              error: false,
              message: {
                  num: 0,
                  info: error,stdout,stderr,
                  data:data
              },
          });
          // console.log(user_wordSize)
          fs.close;
          fs.unlinkSync(path_query);
          fs.unlinkSync(path_result);
          return;
      });

        
      }
})


router.post("/fuzzySeq",(req,res)=> {
  var sql=$sql.property.fuzzySeq;
  
  // console.log(req.body.user_sseqid)
  connection.query(sql,[req.body.user_sseqid],(err,result)=>{
    if(err) {
      console.log("select * from `essential` where fasta  like "%"?"%":",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

module.exports = router;
