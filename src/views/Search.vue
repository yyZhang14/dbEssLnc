<template>
    <div class="result">
        <div class="header">
          <el-row class="title" >
          <img
            src="../../public/assets/img/search.png"
              style="height: 45px; width: auto;  vertical-align: middle; margin-right: 20px;"
          />
          Search from Database
          </el-row>
          <!-- vue 3弃用了native  这么写不对@keyup.enter.native="Search" -->
          <el-autocomplete placeholder="Search By Gene Name/Aliase/NONCODE GENE ID/Detailed Reason Description,eg.Meg3/2900016C05Rik/NONMMUG009962.3/lethality" 
          v-model="inputContent" clearable @keyup.enter="Search" class="input-with-select" :fetch-suggestions="querySearch">
            <template #prepend >
              <el-select v-model="searchOpt" clearable placeholder="Human" class="select" >
                <el-option-group v-for="group in options"  :key="group.label" :label="group.label">
                  <el-option  v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </template>

            <template #append>
              <el-button icon="el-icon-search" @click="Search"></el-button>
            </template>
            
          </el-autocomplete>
        </div>
        <div class="content">
          <!-- 未进行查询 没有数据显示 -->
          <el-row v-if="id==0" style="padding: 5px;" class="content">
            <div class="wrapper">
              <el-col :span="12"  class="explain">
                <img src="../../public/assets/img/sta.png" alt="" style="height: auto; width:100%;">
              </el-col>
              <el-col :span="12" class="explain">
                <p>
                You can obtain the desired information by selecting the search type and searching for
                the corresponding name.If you want to know which are the essential lncRNAs in a certain
                type,you can directly select the type and click search.If you forget how to spell it,
                a fuzzy search can be performed by "%".More detailed fuzzy query rules are given in 'Search help'
                in the tutorial section of the 'Help' page.
                </p>
                <img alt="search example" style="height:auto; width: 100%;" src="../../public/assets/img/sea.png" />
              </el-col>
            </div>


          </el-row>
              <!-- 展示表格  -->
          <div class="tabletitle" v-if="id==1">
            <el-row>
              <el-col :span="4" :offset="10">
                Search results
              </el-col>
            </el-row>
          </div>
          <el-table
            v-if="id==1"
            
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            :data="lncrnaTable"
            :row-class-name="tabRowClassName"
            empty-text="No data available"
            border
            style="width: 100%"
            ref="table"
          >
            <el-table-column label="Name" prop="Name" width="150px" >
              <template #default="scope">
                <span @click="toUrl(scope.row)" class="hand">{{scope.row.Name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="NONCODE Gene ID" prop="NONCODEId" width="180px" >
              <template #default="scope">
                <span @click="toUrl_NONCODE(scope.row.NONCODEId)" class="hand">{{scope.row.NONCODEId }}</span>
              </template>
              
            </el-table-column>
            <el-table-column label="Aliase" prop="Aliases"  >
            </el-table-column>
            <el-table-column label="Organism" prop="Organism" width="100px" >
            </el-table-column>
            <el-table-column label="Detailed Reason Description" prop="Reason"  >
            </el-table-column>

            <el-table-column prop="PubMedID" label="PubMedID" width="100px" >
              <template #default="scope">
                <a :href="url+scope.row.PMID" target="_black">
                  {{scope.row.PMID}}
                </a>
              </template>
            </el-table-column>

            <el-table-column type="expand" label="Details" width="80px">
              <template #default="props">
                <el-form label-position="left" inline class="demo-table-expand" >
                  <el-form-item label="NCBI Gene ID">
                    <span @click="toUrl_NCBI(props.row.NCBI_gene_Id)" class="hand">{{props.row.NCBI_gene_Id}}</span>
                  </el-form-item>

                  <el-form-item label="Reason">
                    <span>{{ props.row.Role }}</span>
                  </el-form-item>
                  <el-form-item label="Gene Ontology Annotations:">
                    <span>{{ props.row.Gene_Ontology_Annotations }}</span>
                  </el-form-item>

                </el-form>
              </template>
            </el-table-column>
          </el-table>

        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  emits: ['close'],
  // inject:['reload'],
  data(){
    return {
      isShow:true,
      lncrnaTable:"",//推到前端的数据
      inputContent:"",//输入的数据
      searchOpt:"option2",// 选择框中的数据
      options: [
        {
          label:"Query by Organism",
          options:[
            {value:"option1",label:"Human"},
            {value:"option2",label:"Mouse"}
          ]

        },
        {
          label:"Query by Reason",
          options: [
            {value:"option3",label:"General"},
            {value:"option4",label:"Tumor suppressor gene"},
            {value:"option5",label:"Oncogene"}
          ]
        }
      ],
      id:0 ,//查询标记
      url:"https://www.ncbi.nlm.nih.gov/pubmed/?term=",
      urlNCBI:"https://www.ncbi.nlm.nih.gov/gene/",

      //用于模糊搜索的输入建议
      properties:[],//空的
      propertyresults:[{value: "Fendrr"},{value: "Gm38509"},{value: "Haglr"},{value: "Pantr2"},{value: "Lncpint"},
                      {value: "Tsix"},{value: "Dnm3os"},{value: "Mir124a-1hg"},{value: "Meg3"},{value: "Chaserr"},
                      {value: "Xist"},{value: "Gm12610"},{value: "lncKdm2b"},{value: "Bvht"},{value: "Paupar"},
                      {value: "Trp53cor1"},{value: "Dreh"},{value: "Gas5"},{value: "Miat"},{value: "Tunar"},
                      {value: "Dlx6os1"},{value: "9030622O22Rik"},{value: "Tslrn1"},{value: "Hm629797"},{value: "4933409F18Rik"},
                      {value: "Gm2044"},{value: "Mhrt"},{value: "Jpx"},{value: "Airn"},{value: "Kcnq1ot1"},
                      {value: "Hand2os1"},{value: "Ttc39aos1"},{value: "Neat1"}],


      // property:[],//查询的结果
      fuzzyHuman:[],
      fuzzyMouse:[],
      fuzzyVital:[],
      fuzzyTumor:[],
      fuzzyCancer:[]
    }
  },
  methods: {
    // 表格显示具有斑马线
    // eslint-disable-next-line no-unused-vars
    kzClick(){
        if(this.isShow){
          this.showData=this.dataList.fasta;
        }
        else{
          this.showData=this.dataList.fasta.slice(0,1000);
        }
        this.isShow=!this.isShow;
    },
    tabRowClassName({ row, rowIndex }) {
      var index = rowIndex + 1;
      if (index % 2 == 0) {
        return "warning-row";
      }
    },
    //展示模糊查询的输入建议
    querySearch(queryString, cb) {
      var properties = this.propertyresults;
      // console.log(properties)
      var results = queryString
        ? properties.filter(this.createFilter(queryString))
        : properties;
        // console.log(results)
      cb(results);
    },
    // !==-1 表示可以匹配包含的，而不是首字母
    createFilter(queryString) {
      return property => {
        // console.log(property);
        return (
          // 这里必须是property.value 才有效?
          property.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    Search(){
      // console.log("Search 函数调用成功！");
      var inputContent = this.inputContent;//输入框中的内容
      var searchOpt = this.searchOpt;//选择框中的内容
      var _this = this;
      //有多少种情况
      //选择option1 Human;  default option is human
      if(searchOpt == "option1"){
        //输入框为空
        if(inputContent == ""){
          axios.post("api/property/selectHuman").then(function(respond){
            _this.lncrnaTable=respond.data;
            _this.id = 1;
          })
        }
        //输入框不为空
        else{
          axios.post("api/property/searchHuman",{inputContent}).then(function(respond){
          _this.lncrnaTable=respond.data;
          _this.id = 1;
          })
        }
      }
      //选择option2 Mouse
      else if(searchOpt == "option2"){
        //输入框为空
        if(inputContent == ""){
          axios.post("api/property/selectMouse").then(function(respond){
            _this.lncrnaTable=respond.data;
            _this.id = 1;
          })
        }
        //输入框不为空
        else{
          axios.post("api/property/searchMouse",{inputContent}).then(function(respond){
          _this.lncrnaTable=respond.data;
          _this.id = 1;
          })
        }
      }
      //选择 option3 reason is vital
      else if(searchOpt == "option3"){
        //输入框为空
        if(inputContent == ""){
          axios.post("api/property/select_reason_vital").then(function(respond){
            _this.lncrnaTable=respond.data;
            _this.id = 1;
          })
        }
        //输入框不为空
        else{
          axios.post("api/property/searchVital",{inputContent}).then(function(respond){
          _this.lncrnaTable=respond.data;
          _this.id = 1;
          })
        }
      }


      //选择 option 4 reason is tumor
      else if(searchOpt == "option4"){
        //输入框为空
        if(inputContent == ""){
          axios.post("api/property/select_reason_tumor").then(function(respond){
            _this.lncrnaTable=respond.data;
            _this.id = 1;
          })
        }
        //输入框不为空
        else{
          axios.post("api/property/searchTumor",{inputContent}).then(function(respond){
          _this.lncrnaTable=respond.data;
          _this.id = 1;
          })
        }
      }
      

      //option 5 reason is cancer
      else if(searchOpt == "option5"){
        //输入框为空
        if(inputContent == ""){
          axios.post("api/property/select_reason_cancer").then(function(respond){
            _this.lncrnaTable=respond.data;
            _this.id = 1;
          })
        }
        //输入框不为空
        else{
          axios.post("api/property/searchCancer",{inputContent}).then(function(respond){
          _this.lncrnaTable=respond.data;
          _this.id = 1;
          })
        }
      }




    },
    toUrl_NONCODE(data){
      window.location.href = "http://www.noncode.org/show_gene.php?id="+data.split(".")[0]+"&version="+data.split(".")[1]+"&utd=1#"
    },
    toUrl_NCBI(data){
      window.location.href = "https://www.ncbi.nlm.nih.gov/gene/"+data
    },
    toUrl(data){
      

      sessionStorage.setItem('dataSearch', JSON.stringify(data));
      this.$router.push({
        name:'Gene',
        params:data,
        query:{page:"Search"}
      })

    }
    
  },

  mounted () {
    var _this = this;
    axios
      .all([
        axios.post("/api/property/fuzzyHuman"),
        axios.post("/api/property/fuzzyMouse"),
        axios.post("/api/property/fuzzyVital"),
        axios.post("/api/property/fuzzyTumor"),
        axios.post("/api/property/fuzzyCancer")

      ])
      .then(
        axios.spread((human, mouse,vital ,tumor,cancer) => {
          for (let i = 0;i< human.data.length;i++){
          _this.fuzzyHuman.push({
          "value":human.data[i]["Name"]
          })
        }
          for (let i = 0;i< mouse.data.length;i++){
          _this.fuzzyMouse.push({
          "value":mouse.data[i]["Name"]
          })
        }
          for (let i = 0;i< vital.data.length;i++){
          _this.fuzzyVital.push({
          "value":vital.data[i]["Name"]
          })
        }
          for (let i = 0;i< tumor.data.length;i++){
          _this.fuzzyTumor.push({
          "value":tumor.data[i]["Name"]
          })
        }   
        
          for (let i = 0;i< cancer.data.length;i++){
          _this.fuzzyCancer.push({
          "value":cancer.data[i]["Name"]
          })
        }  

        })
      );
  },
  watch: {
    //监听选择框的选项，根据选项进行输入建议的列表输出
    searchOpt(val){
      //console.log("searchOpt 函数调用成功！")
      var searchOpt = val;
      var _this = this;

      if (searchOpt == "option1") {
        _this.propertyresults = _this.fuzzyHuman;
      }
      else if (searchOpt == "option2") {
        _this.propertyresults =  _this.fuzzyMouse;
        
      } else if (searchOpt == "option3" ) {
       
        _this.propertyresults =  _this.fuzzyVital;
      } 
      else if (searchOpt == "option4") {
        _this.propertyresults =  _this.fuzzyTumor;
      }
      else if (searchOpt == "option5") {
        _this.propertyresults =  _this.fuzzyCancer;
      }




    }

  }

}
</script>

<style>
/* 没有用scoped 如果使用斑马线设置无效 */
.header {
  width: 100%;
  padding-bottom: 60px;
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
}
.title{
  /* 将图片和文字一起居中 */
  justify-content: center;
  align-items: center;
  line-height: 80px;
}
.input-with-select {
  width: 80%;
  /* font-size: 15px; */
}
.el-collapse-item__header {
  font-size: 16px;
}

.el-select {
  width: 220px;
}

.el-select-group__title {
  text-align: center;
  font-size:16px;
  font-family:monospace;
}

.el-select-dropdown__item {
  text-align: center;
  text-indent: 2em;
}

.el-input {
  font-size: 15px;
}

.content {
  padding: 10px;
}

.el-table {
  font-size: 15px;
  color: #232324;
  white-space: pre-line;
}

.el-table .warning-row {
  background: #ccf1f1;
}
.tabletitle {
  text-align: center;
  background-color: #99cccc;
  height: 30px;
  line-height: 30px;
  color: #686868;
  font-weight: bold;
}
.explain {
  /* border: solid 1px #99cccc; */
  padding: 10px;
  width: 70%;
}
.explain p {
  text-indent: 2em;
  text-align: justify;
}

.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
  width: auto;
  color: #99a9bf;
}
.demo-table-expand {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.el-form-item {
  float: left;
  clear: both;
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

span {
  display:inline-block;
  width:100%; 
  word-wrap:break-word; 
  word-break: break-all; 
  white-space:normal ; 
  font-family:monospace;
} 
.el-input__prefix, .el-input__suffix{
  text-align: right;
}
/* .span_style{
  background:#f2f4f6;
  width:70%;
  font-family:monospace;
} */
.wrapper{
  display:flex;
  align-item:center;
  padding-left:10px;
}


</style>