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
//服务器的路径
const tempPath_query = "/home/yyzhang/dbesslnc/blast/temp/"
const tempPath_result= "/home/yyzhang/dbesslnc/blast/temp/" 
const db_path = "/home/yyzhang/dbesslnc/blast/lncrna/lncrna.fasta"
//本地的路径
// const tempPath_query = "/Users/zyy/Desktop/code/ES-test/blast/temp/"
// const tempPath_result= "/Users/zyy/Desktop/code/ES-test/blast/temp/" 
// const db_path = "/Users/zyy/Desktop/code/ES-test/blast/lncrna/lncrna.fasta"

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
//将json数据转换为dict的格式，供BLAST页面使用

// var dictWrite = function(dictRes,res) {
//   if(typeof res === "undefined"){

//   }
// }

//browser 页面的sql语句
//show final table
router.post("/final", (req, res) => {
  var sql = $sql.property.selectFinal;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM final table ERROR]:", err.msg);
    }
    if (result) {
      //console.log(result)
      jsonWrite(res, result);
    }
  });
});
//show vital table
router.post("/vital", (req, res) => {
  var sql = $sql.property.selectVital;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM vital table ERROR]:", err.msg);
    }
    if (result) {
      //console.log(result)
      jsonWrite(res, result);
    }
  });
});
//show tumor table
router.post("/tumor", (req, res) => {
  var sql = $sql.property.selectTumor;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM tumor table ERROR]:", err.msg);
    }
    if (result) {
      //console.log(result)
      jsonWrite(res, result);
    }
  });
});
//show cancer table
router.post("/cancer", (req, res) => {
  var sql = $sql.property.selectCancer;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM cancer table ERROR]:", err.msg);
    }
    if (result) {
      //console.log(result)
      jsonWrite(res, result);
    }
  });
});



//search page
//organism is human
router.post("/selectHuman", (req, res) => {
  var sql = $sql.property.selectHuman;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM final table where organism is human ERROR]:", err.msg);
    }
    if (result) {
     // console.log(result)
      jsonWrite(res, result);
    }
  });
});
//organism is mouse
router.post("/selectMouse", (req, res) => {
  var sql = $sql.property.selectMouse;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM final table where organism is mouse ERROR]:", err.msg);
    }
    if (result) {
      //console.log(result)
      jsonWrite(res, result);
    }
  });
});
//reason is vital
router.post("/select_reason_vital", (req, res) => {
  var sql = $sql.property.select_reason_vital;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM final table  where reason is vital ERROR]:", err.msg);
    }
    if (result) {
      //console.log(result)
      jsonWrite(res, result);
    }
  });
});
//reason is tumor
router.post("/select_reason_tumor", (req, res) => {
  var sql = $sql.property.select_reason_tumor;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM final table where reason is tumor ERROR]:", err.msg);
    }
    if (result) {
      //console.log(result)
      jsonWrite(res, result);
    }
  });
});
//reason is cancer
router.post("/select_reason_cancer", (req, res) => {
  var sql = $sql.property.select_reason_cancer;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM final table where reason is cancer ERROR]:", err.msg);
    }
    if (result) {
      //console.log(result)
      jsonWrite(res, result);
    }
  });
});


//quzzy search 

router.post("/searchHuman",(req,res)=> {
  var sql=$sql.property.searchHuman;
  var proName = req.body;
  connection.query(sql,[proName.inputContent],(err,result)=>{
    if(err) {
      console.log("search final table where Organism ='human' error:",err.msg)
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
      console.log("search final table where Organism ='mouse' error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/searchVital",(req,res)=> {
  var sql=$sql.property.searchVital;
  var proName = req.body;
  connection.query(sql,[proName.inputContent],(err,result)=>{
    if(err) {
      console.log("search final table by role is vital error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/searchTumor",(req,res)=> {
  var sql=$sql.property.searchTumor;
  var proName = req.body;
  connection.query(sql,[proName.inputContent],(err,result)=>{
    if(err) {
      console.log("search final table by role is tumor error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/searchCancer",(req,res)=> {
  var sql=$sql.property.searchCancer;
  var proName = req.body;
  connection.query(sql,[proName.inputContent],(err,result)=>{
    if(err) {
      console.log("search final table by role is cancer error:",err.msg)
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
      console.log("select Name from `final` where Organism ='human' error:",err.msg)
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
      console.log("select Name from `final` where Organism ='mouse' error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/fuzzyVital",(req,res)=> {
  var sql=$sql.property.fuzzyVital;
  connection.query(sql,(err,result)=>{
    if(err) {
      console.log("select Name from `final` where role is vital error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/fuzzyTumor",(req,res)=> {
  var sql=$sql.property.fuzzyTumor;
  connection.query(sql,(err,result)=>{
    if(err) {
      console.log("select Name from `final` where role is tumor error:",err.msg)
    }
    if(result){
      jsonWrite(res,result);
    }
  })
})

router.post("/fuzzyCancer",(req,res)=> {
  var sql=$sql.property.fuzzyCancer;
  connection.query(sql,(err,result)=>{
    if(err) {
      console.log("select Name from `final` where role is cancer error:",err.msg)
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
        // 将前端的请求序列存在文件中
        var user_seq = req.body.user_seq;
        var user_wordSize = req.body.user_wordSize.toString();
        var user_eValue = req.body.user_eValue.toString();
        //console.log(user_seq,user_wordSize,user_eValue);
        var path_query = tempPath_query + inputFile + '.fasta';
        var path_result = tempPath_result + outputFile + '.txt';

        fs.writeFileSync(path_query, user_seq); 
        fs.writeFileSync(path_result,"");   
        // 调用命令行测试
        // let tempSeq = fs.readFileSync(path_query, "utf8");
        // console.log(tempSeq)

        var cmd = BLASTDB+'blastn -query '+path_query+
                  ' -out '+path_result+
                  ' -db '+db_path+
                  ' -outfmt "6 qseqid sseqid pident length evalue bitscore "'+
                  ' -evalue '+user_eValue+
                  ' -word_size '+user_wordSize;
        //console.log(cmd)
        exec(cmd, function(error, stdout, stderr) {
          // 读取测试结果
          let data = fs.readFileSync(path_result, "utf8").split('\n'); 
          //console.log(data)

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
  //var sql=$sql.property.fuzzySeq;  
  var alignId = req.body.alignId;
  
  var sql = "select * from `trans` where NONCODE_TRANSCRIPT_ID in ("+alignId+")";
  connection.query(sql,(err,result)=>{
    
    if(err) {
      console.log(err.msg)
    }
    if(result){      
      jsonWrite(res,result);
      
    }
   
  })
})

router.post("/profiles",(req,res)=> {

  var id=req.body.RNAid;
  // console.log("profile req",id);
  var sql=$sql.property.profile;
  connection.query(sql,[id],(err,result)=>{
    // console.log("zhixingle!");
    if(err) {
      console.log("select * from `expression` where ID = ?",err.msg)
    }
    if(result){
      // console.log(result);
      jsonWrite(res,result);
      
    }
    
  })
})
router.post("/transcript",(req,res)=> {

  var DNAid=req.body.DNAid;
  
  var sql=$sql.property.transcript;
  connection.query(sql,[DNAid],(err,result)=>{
    
    if(err) {
      console.log("select * from `trans` where NONCODE_Gene_ID = ?",err.msg)
    }
    if(result){
      jsonWrite(res,result);
      
    }
    
  })
})




module.exports = router;
