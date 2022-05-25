<template>
  <div>
    <el-row class="title" style="color: #606060;">
    <img style="margin-right: 20px; height: 55px; width: 55px;vertical-align: middle;" 
         src="../../public/assets/img/blast.png" />
      Blast
    </el-row>
    <div class="myForm" >
      <el-input 
      class="RNAinput" 
      type="textarea" 
      rows="10" 
      placeholder="Enter the query lncRNA sequence(FASTA)" 
      v-model="textarea" 
      clearable></el-input>
      <div  style="margin-top: 20px">
        <b class="sou" >e-value: </b>
        <el-select v-model="eValue" clearable @change="evalue_change" style="margin: 0 20px 0 10px">
        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <b class="sou" >word size: </b>
        <el-select v-model="word_size" clearable @change="word_change" style="margin: 0 20px 0 10px">
        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>


        <el-button 
        class="sou" 
        type="success" 
        v-on:click="Search(eValue,word_size)" 
        style="margin-left: 10px; padding-left: 10px" 
        icon="el-icon-search" plain>Blast</el-button>
        <el-button 
        class="sou" 
        v-on:click="SearchExample()" 
        plain>Example</el-button>
       

        <el-table
          :data = "tableData"
          v-show="isShow"
          border
          stripe
          style = "width:100%;margin:20px auto 0 auto"
          strip highlight-current-row>
          <el-table-column type="expand">
            <template #default="props">
              <el-form label-position="left" inline class="demo-table-expand" >

                <el-form-item label="NONCODE Gene ID:">
                  <span @click="toUrl_DNA(props.row.NONCODE_Gene_ID)" class="hand">{{ props.row.NONCODE_Gene_ID }}</span>
                </el-form-item>
                <el-form-item label="NONCODE Transcript ID:">
                  <span @click="toUrl_RNA(props.row.NONCODE_TRANSCRIPT_ID)" class="hand">{{ props.row.NONCODE_TRANSCRIPT_ID }}</span>
                </el-form-item>
                <el-form-item label="LncRNA Sequence Length:" >
                  <span>{{props.row.Seqlength}}</span>
                </el-form-item>
                <el-form-item label="Sequence:" >
                  <span class="newlist" v-html="props.row.Sequence">
                  </span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column
            label="Name"
            prop="Name"
            width="100">
          </el-table-column>
          <el-table-column
            label="Organism"
            prop="Organism"
            width="100">
          </el-table-column>
          <el-table-column
            label="Subject seq id"
            prop="sseqid"
            width="230">
          </el-table-column>
          <el-table-column
                label="Percentage(identical matches)"
                prop="pident"
                width="250" >
          </el-table-column>
          <el-table-column
            label="Alignment length"
            prop="length"
            width="200">
          </el-table-column>

          <el-table-column
            label="e-value"
            prop="evalue">
          </el-table-column>
          <el-table-column
            label="Bitscore"
            prop="bitscore">
          </el-table-column>




        </el-table>    

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElLoading } from 'element-plus'

export default {
  data() {
    return {
      example: `>NONMMUT015694.2
AGCACAGAAGACGAAGAGCTGGAATAGAGCTCGCCTCGGCTCTGCTGGCCTTGGCTGCAGCTCTTCCAGAAACCCGGGGCGCCCACAGAAGAATCTCTTACCTGGCTCTCTCTTCAGGGATGACATCATCGGCTCACACCAGTCTTCCAGGACCACCTTCTGGATGCCAAGGCTGCTGCTCGAGTACCTGCTGTGCACCTCTACCTCCTGAGCCAAGGAGCACGGATTCCAGGAACCCACTACCATACAGAGCAACTCCTTGTGGACCCCCCTGGGATCAGGACAGCGAGGGACAAGCGACAAAGAGGATCATCAGTGGCCAGCTAGTTTCTCTGGGGTTCAAACCTTGAACCAGTGCCCTAGTGAGGGGGCACTGGCCATGGCCCTTGACCTTTGCTCTGCTTGTGTCTTGAGTCTGAGCCCTTTCCTGTACATCTGTGCTCGTGTTCATCTGCTAGTGAACTGGAGTGCTGCCCTCCCCGAGGAGGGTCGTCCCTTGTGACTGATCATGCTGTCCTAACAATGTCCTGAGCAAAAGGGTCCCTTTGGGAACCTCTCAGGAGGGGGACCCGGGTCAGGGGCGACCAGCATCTTGCTGGCAACTCCGTgggtggggtggggtggggtgCTTCCTTCTGGAATGAGCACGTGGCTGACCCCCCAAGGCATGTCCCCTCCCCCTCCTCCACCCACCTTCTCGGAGATGTCCCTTTTGGGGTagtggggacattaggagcaacctcctagggttgttgtgagaattaaatgaactGCAGCAGCCTGAGGCAGGGCTGGGCAGAGACCTCAGCACATGTTTGTTGAAAGGTTTGCAGGTGGATCTAGTCCTCCCGTTCATGGCTCATGTGTCTCAACCATTCTCTCGCAGACTCCTGCAGCCCCTATGCCCAGGGCTCTCCTTGCGCCAGAGGTAGGTGGGAAAGAGAACTGGGAGAGCCCGGACTCACTCATGAGATTGAACTTAAATTCACACGGAGGACACTTGGACTCTTGCCACATTAGCCCCGGCTTCTCGAGGCCTGTCTACACTCGCTGCTTTCCTTCCTCACCTCCAATTTCCCCTCCAACCCACTGCTTCCTGACTCGCTCTTCTCCATCGAACGGCTCTCGCTCAGGCCTGTCGCGTCTTCCTGTGCCATTTGCTGTTGTGCTCAGGTTCCACGAGCTGCCCATCTCCACAGAAGAGCAGCTGGCATTGCCCACCGGCCATGCCGGCTGAAGAAAAGAAGACTGAGGACCCCAGGATGCCCAGCGCGAGGACCCCAGGAAGCCCAGCGCGAGGACTCCACCCACGACGCCCAGCGCGAGGACTTCACGCACAACACGTTGCAACCCTCCTGGATTAGGCCAAAGCCATCATCTGGAATCCTGCGTGGGACCCTGGACACACGGACACAGACACCTGCCCCCAGGACCCTCCAACTGTAAATCgtgtgcgtcactggcaagcctacctcacagggttgttgtgagggctaaGGGCTGATCGGCTGTAACAGTGTGATGTCCATGCTGGCTGTCACCAGGGATGGTGCCATGATGGGGTTGGCTTGAAATCACAACCTATACCGTTATTAGTGGTCACTGAATAAAGAGTCTCACTGTGGACACTGAGCCTCTACAGCCACGGGGACGCCTTGCACATTTCCTGTGGGACATGCTGGACCCAAGACTCTGGACCCTGGCCTCCCCTTGAGTAGAGAGACCCACCTACTGACTGATGAACTGCGCTGACCCTGGGGTCAGGCATGTGGCCTTGATCCCTACCCATGGACCCTGAGACTTGGGGGGGTGGGAGAAAGGCTGTTGTGTCTTCACTGTTGAGtctacatctgtgaaatgggctcaggttcctacctcacagggctgttgtgaggcagccgcaatgtgcttagaagcatggggcctagtggctcatggtgctttcaataaatTTCTTGTTTTAACTAAAGCA`,
      textarea: '',
      
      word_size:'11',
      options2:[
       {value:'5',label:'5'},
       {value:'6',label:'6'},
       {value:'7',label:'7'},
       {value:'8',label:'8'},
       {value:'9',label:'9'},
       {value:'10',label:'10'},
       {value:'11',label:'11'}],
      // 设置eValue下拉框选项
      options1: [
          {
          value: '1e-3',
          label: '1e-3'
          },{
          value: '1e-4',
          label: '1e-4'
          },{
          value: '1e-5',
          label: '1e-5 '
          },{
          value: '1e-6',
          label: '1e-6 '
          },{
          value: '1e-7',
          label: '1e-7 '
          }],
      // 设置eValue默认值
      eValue: '1e-7',
      resData:[],
      tableData:[],     
      isShow:false,
      length:1,
      RNAID:"",
      SeqData:{}
    
    }
  },
  methods: {
    SearchExample(){
      //显示example数据
      this.textarea = this.example;
    },
    evalue_change(val){
      this.eValue = val;
    },
    word_change(val){
      this.word_size = val;
    },
    Search(eValue,word_size){

      const loadingInstance = ElLoading.service({
        fullscreen:true,
        text:"Loading...",
        background:"rgba(0,0,0,0.7)"
      });

      var _this = this
      _this.isShow = true
      axios.post("api/property/blast",{
          user_seq: _this.textarea,
          user_wordSize: word_size,
          user_eValue: eValue
      }).then(respond =>{
        
        _this.resData=respond.data.message.data
        _this.length=respond.data.message.data.length
        console.log(_this.length)
        if(_this.length == 1){
          window.alert("Blast query is Empty or FASTA sequence format error!")
        }
        else{
         
          // 最后一行是空的，所以length-1
          let stuID = []
          for(let i = 0;i < _this.length-1;i++){            
            if(_this.resData != ""){
              stuID.push(_this.resData[i].split("\t")[1])                                                     
            }           
          }
          _this.RNAID = "'"+stuID.join("','")+"'"
        }
        //console.log(_this.length)
        //console.log( _this.RNAID)
     
         
        axios.post("api/property/fuzzySeq",{
        alignId: _this.RNAID
        }).then(respond => {
          let tempSeq = respond.data
          for(let index = 0;index < tempSeq.length;index++){
            let keyID = tempSeq[index]
            _this.SeqData[keyID.NONCODE_TRANSCRIPT_ID] = tempSeq[index]
          }
          //console.log(_this.SeqData)
          for(let j = 0; j < _this.length-1 ; j++){        
            let sseqid = _this.resData[j].split('\t')[1]
            let pident = _this.resData[j].split('\t')[2]
            let length = _this.resData[j].split('\t')[3]
            let evalue = _this.resData[j].split('\t')[4]
            let bitscore = _this.resData[j].split('\t')[5].split('\r')[0]

            //console.log("key: " + sseqid + " ,value: " + _this.SeqData[sseqid])
            let Name = _this.SeqData[sseqid]["Name"]
            let Organism = _this.SeqData[sseqid]["Organism"]
            let NONCODE_Gene_ID = _this.SeqData[sseqid]["NONCODE_Gene_ID"]
            let NONCODE_TRANSCRIPT_ID = _this.SeqData[sseqid]["NONCODE_TRANSCRIPT_ID"]
            let Sequence = _this.SeqData[sseqid]["FASTA"]
            let Seqlength = _this.SeqData[sseqid]["length"]
            let result = {
              
              "sseqid":sseqid,
              "pident":pident,
              "length":length,
              "evalue":evalue,
              "bitscore":bitscore,
              "Name":Name,
              "Organism":Organism,
              "NONCODE_Gene_ID":NONCODE_Gene_ID,
              "NONCODE_TRANSCRIPT_ID":NONCODE_TRANSCRIPT_ID,
              "Seqlength":Seqlength,
              "Sequence":Sequence            
            }

            _this.tableData.push(result)
           
          }
          loadingInstance.close() 
         
        
        })
        
        
        
      })
      



     
    },

    toUrl_DNA(data){
      window.location.href = "http://www.noncode.org/show_gene.php?id="+data.split(".")[0]+"&version="+data.split(".")[1]+"&utd=1#"
    },
    toUrl_RNA(data){
      window.location.href = "http://www.noncode.org/show_rna.php?id="+data.split(".")[0]+"&version="+data.split(".")[1]+"&utd=1#"
    }

  }
}

</script>

<style scoped>
.el-select{
  width: 150px !important;
}
.el-input{
  width: 150px;
}
.el-select-dropdown__item{
  text-align: center !important;
}
</style>
<style scoped lang="less">
.myForm {
  margin: 10px auto; /* 表单居中设置 */
  padding: 40px 60px;
  width: 75%;
  border: 3px solid #b4ede7;
  border-radius: 10px;
}

.el-table {
  font-size: 15px;
  white-space: pre-line;
  //color: #232324;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
:deep(.el-form-item__label) {
  font-size: 15px;
  //color: #232324;
}

.title {
  text-align: center;
  font-size: 1.5em;
  line-height: 80px;
  height: 80px;
  background: #e6f0ef; /* Old browsers */
  background: -moz-linear-gradient(
    -45deg,
    #e6f0ef 45%,
    #b4ede7 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    -45deg,
    #e6f0ef 45%,
    #b4ede7 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    135deg,
    #e6f0ef 45%,
    #b4ede7 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e6f0ef', endColorstr='#b4ede7',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

.el-form-item {
  border-top: 1px solid #ebeef5; // 表格线条颜色
  margin-bottom: 0;
}

.el-form-item :deep(.el-form-item__label)  {
  border-right: 1px solid #ebeef5;
}


// /deep/ 相当于 >>>
:deep(.el-input__inner:hover) {
  // background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}

:deep(.el-input .is-active .el-input__inner.el-input__inner:focus)  {
  border-color: rgb(115, 200, 200) !important;
}

:deep( .el-radio__inner:hover) {
  background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}
// 单选框的标签可以换行了
:deep(.all_label)  {
  display: inline-grid;
  white-space: pre-line;
  word-wrap: break-word;
  overflow: hidden;
  line-height: 20px;
}
:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: rgb(115, 200, 200) !important;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner)  {
  background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}
:deep(.el-checkbox__label){
  padding-left: 5px;
}
:deep(.el-radio__input.is-checked + .el-radio__label)  {
  color: rgb(115, 200, 200) !important;
}
:deep(.el-radio__input.is-checked .el-radio__inner){
  background-color: rgb(115, 200, 200) !important;
  border-color: rgb(115, 200, 200) !important;
}
:deep(.el-radio__label) {
  padding-left: 5px;
  font-size: 15px;
  color: #232324;
}
:deep(.el-textarea__inner){
  border-color: rgb(115, 200, 200) !important;
  font-size: 15px;
  color: #232324;
}
:deep(.el-select .el-input__inner:focus)  {
  border-color: rgb(115, 200, 200);
}

.el-select {
  margin-left: 10px;
}

.el-select-dropdown__item.selected {
  color: rgb(115, 200, 200);
}

.el-select-dropdown__item {
  text-align: center;
  text-indent: 0;
}


// 遮盖原始按钮，以改变原始按钮的样式
.upload {
  height: 35px;
  line-height: 35px;
  //   position: relative;
  font-size: 15px;
  width: 100px;
  border-radius: 5px;
  color: #fff;
  background-color: #5cb85c;
  margin: auto 30px;
  outline: none;
  cursor: pointer;
}

// 选择文件的原始按钮
.change {
  position: absolute;
  overflow: hidden;
  width: 100px;
  line-height: 35px;
  left: 30px;
  top: 20px;
  opacity: 0; // 设为透明
  cursor: pointer;
}

.submit {
  font-size: 15px;
  height: 35px;
  width: 120px;
  border-radius: 5px;
  color: #fff;
  background-color: #337ab7;
  border: #337ab7;
  margin: auto 10px; // 按钮居中
  outline: none;
  cursor: pointer;
}

.myemail {
  font-size: 15px;
  height: 35px;
  width: 120px;
  border-radius: 5px;
  color: #fff;
  background-color: #e6a23c;
  border: #e6a23c;
  margin: 10px 10px 10px; // 按钮居中
}

.progress-wrap {
  width: 100%;
  margin: 0 auto;
  // border-left: 1px solid #ebeef5;
  p {
    margin: 0 auto;
    width: 100%;
    font-size: 15px;
  }
  .progress {
    background-color: #c5c8ce;
    height: 15px;
    span {
      display: block;
      background-color: #19be6b;
      height: 100%;
      width: 0;
    }
  }
}
span {
  display:inline-block;
  // 在span标签中，可设置输出的内容截断 
  word-wrap:break-word; 
  word-break: break-all; 
  white-space:normal ; 
  width:100%;
  font-size:15px;
  font-family:"Avenir", Helvetica, Arial, sans-serif;
} 

.hand:hover{
  color:#1ee3cf;
  cursor:pointer
}
.newlist {
  position: relative;
  margin: 0 auto;
  width: 80%;
  min-height: 30px;
  line-height: 20px;
  /* border: 1px solid ; */
  word-break: break-all;
  hyphens: auto;
  text-align: left;
  padding: 5px 10px;
  background:#f2f4f6;
  font-family:monospace;
}
.open_style{
  height:18px;
  width:18px;
}
.sou{
  font-weight:700;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size:15px;

}
/deep/ .el-button span {
  font-weight:700;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size:15px;
}
</style>
