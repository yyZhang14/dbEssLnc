<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        style="margin-right: 20px; height: 55px; width: 55px; vertical-align: middle;"
        src="../../public/assets/img/browse.png"
      />
      Browse all
    </el-row>
    <el-container style="height: expression(document.body.clientHeight-130px); border: 1px solid #eee">
      <!-- 侧边导航栏 -->
      <el-aside 
        width="300px"
        style="background-color: rgb(238, 241, 246); text-align:left;">
        <el-menu :default-openeds="['1']">
           <el-submenu index="1">
            <template v-slot:title>
              <i class="el-icon-s-grid"></i><b>Browse</b>
            </template>

            <el-menu-item index="1-1" >
              <!-- <a href="#vital">essential lncRNA</a> -->
              <a href="javascript:void(0)" @click="goAnchor('#vital')">general essential lncRNA</a>
            </el-menu-item>

            <el-menu-item index="1-2" >
              <!-- <a href="#tumor">tumor suppressor genes</a> -->
              <a href="javascript:void(0)" @click="goAnchor('#tumor')">tumor suppressor gene</a>
            </el-menu-item>

            <el-menu-item index="1-3">
              <!-- <a href="#cancer">essential lncRNA in cancer cell</a> -->
              <a href="javascript:void(0)" @click="goAnchor('#cancer')">oncogene</a>
            </el-menu-item>

          </el-submenu>

        </el-menu>

      </el-aside>
      <!-- 显示表格 -->
      <el-container >
        <el-main class="browseBody">
          <!-- show vital -->
          <div>
            <!-- <a name="vital"></a> -->
            <h3 id="vital">general essential lncRNA</h3>
            <el-table
            :data = "vital"
            :header-cell-style ="{background:'#eef1f6',color:'#606266'}"
            height="400"
            border
            stripe
            style="width: 100%"
            strip highlight-current-row
            >
            <el-table-column
              label="Name"
              prop="Name"
              width="150">
            </el-table-column>
            <el-table-column prop="NCBI_gene_Id" label="NCBI_gene_Id" width="150">
              <template #default="scope">
              <a :href="urlNCBI+scope.row.NCBI_gene_Id" target="_black">
                {{scope.row.NCBI_gene_Id}}
              </a>
              </template>
            </el-table-column>

            <el-table-column
              label="Organism"
              prop="Organism"
              width="100">
            </el-table-column>
            <el-table-column
              label="Reason"
              prop="Reason">
            </el-table-column>

            <el-table-column prop="PubMedID" label="PubMedID" width="100">
                <template #default="scope">
                  <a :href="url+scope.row.PMID" target="_black">
                    {{scope.row.PMID}}
                  </a>
                </template>
            </el-table-column>

                        <!-- 扩展部分 -->
            <el-table-column type="expand" label="Details" width="100">
              <template #default="props">
                <el-form label-position="left" inline class="demo-table-expand" >
                  <el-form-item label="NONCODEId:">
                    <span>{{ props.row.NONCODEId}}</span>
                  </el-form-item>
                  <el-form-item label="Aliases/full_Name:">
                    <span>{{ props.row.Aliases}}</span>
                  </el-form-item>
                  <el-form-item label="Gene Ontology Annotations:">
                    <span>{{ props.row.Gene_Ontology_Annotations }}</span>
                  </el-form-item>
                  <el-form-item label="Sequence:" >
                    <span>{{ props.row.fasta }}</span>
                  </el-form-item>
                </el-form>
            </template>
            </el-table-column>


            </el-table>    
          </div>
        <!-- show tumor -->
          <div>
            <!-- <a name="tumor"></a> -->
            <h3 id="tumor">tumor suppressor gene</h3>
            <el-table
            :data = "tumor"
            :header-cell-style ="{background:'#eef1f6',color:'#606266'}"
            height="400"
            border
            stripe
            style="width: 100%"
            strip highlight-current-row
            >
            <el-table-column
              label="Name"
              prop="Name"
              width="150">
            </el-table-column>
            <el-table-column prop="NCBI_gene_Id" label="NCBI_gene_Id" width="150">
              <template #default="scope">
              <a :href="urlNCBI+scope.row.NCBI_gene_Id" target="_black">
                {{scope.row.NCBI_gene_Id}}
              </a>
              </template>
            </el-table-column>

            <el-table-column
              label="Organism"
              prop="Organism"
              width="100">
            </el-table-column>
            <el-table-column
              label="Reason"
              prop="Reason">
            </el-table-column>

            <el-table-column prop="PubMedID" label="PubMedID" width="100">
                <template #default="scope">
                  <a :href="url+scope.row.PMID" target="_black">
                    {{scope.row.PMID}}
                  </a>
                </template>
            </el-table-column>
            <el-table-column type="expand" label="Details" width="100">
              <template #default="props">
                <el-form label-position="left" inline class="demo-table-expand" >

                  <el-form-item label="Aliases/full_Name:">
                    <span>{{ props.row.Aliases}}</span>
                  </el-form-item>
                  <el-form-item label="Gene Ontology Annotations:">
                    <span>{{ props.row.Gene_Ontology_Annotations }}</span>
                  </el-form-item>
                  <el-form-item label="Sequence:" >
                    <span>{{ props.row.fasta }}</span>
                  </el-form-item>
                </el-form>
            </template>
            </el-table-column>

            </el-table>    
          </div>
        <!-- show cancer -->
          <div>
            <!-- <a name="cancer"></a> -->
            <h3 id = "cancer">oncogene</h3>
            <el-table
            :data = "cancer"
            :header-cell-style ="{background:'#eef1f6',color:'#606266'}"
            height="400"
            border
            stripe
            style="width: 100%"
            strip highlight-current-row
            >
            <el-table-column
              label="Name"
              prop="Name"
              width="150">
            </el-table-column>
            <el-table-column prop="NCBI_gene_Id" label="NCBI_gene_Id" width="150">
              <template #default="scope">
              <a :href="urlNCBI+scope.row.NCBI_gene_Id" target="_black">
                {{scope.row.NCBI_gene_Id}}
              </a>
              </template>
            </el-table-column>

            <el-table-column
              label="Organism"
              prop="Organism"
              width="100">
            </el-table-column>
            <el-table-column
              label="Reason"
              prop="Reason">
            </el-table-column>

            <el-table-column prop="PubMedID" label="PubMedID" width="100">
                <template #default="scope">
                  <a :href="url+scope.row.PMID" target="_black">
                    {{scope.row.PMID}}
                  </a>
                </template>
            </el-table-column>

            <el-table-column type="expand" label="Details" width="100">
              <template #default="props">
                <el-form label-position="left" inline class="demo-table-expand" >

                  <el-form-item label="Aliases/full_Name:">
                    <span>{{ props.row.Aliases }}</span>
                  </el-form-item>
                  <el-form-item label="Gene Ontology Annotations:">
                    <span>{{ props.row.Gene_Ontology_Annotations }}</span>
                  </el-form-item>
                  <el-form-item label="Sequence:" >
                    <span>{{ props.row.fasta }}</span>
                  </el-form-item>
                </el-form>
            </template>
            </el-table-column>

            </el-table>    
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import { ElLoading } from 'element-plus'

export default{
  data () {
    return {
      url:"https://www.ncbi.nlm.nih.gov/pubmed/?term=",
      urlNCBI:"https://www.ncbi.nlm.nih.gov/gene/",
      vital:[],
      tumor:[],
      cancer:[],
      count:3,
      // vitalShow:1
      // fullscreenLoading: false
    }
  },
  mounted () {
      var _this =this;
      ElLoading.service({
        fullscreen:true,
        text:"Loading...",
        background:"rgba(0,0,0,0.7)"
      });

//show vital table data 
      axios.post("api/property/vital").then(respond =>{
      _this.vital = respond.data;
      _this.count-- ;
      _this.LoadingClose();
      //console.log("vital!")

      });
//show tumor table data
      axios.post("api/property/tumor").then(respond =>{
      _this.tumor = respond.data;
      _this.count-- ;
      _this.LoadingClose();
      //console.log("tumor")

      });
//show cancer table data
      axios.post("api/property/cancer").then(respond =>{
      _this.cancer = respond.data;
      _this.count-- ;
      _this.LoadingClose();
      //console.log("cancer")

      })

  },
  methods: {
    LoadingClose (){
      if(this.count === 0){
        let loadingInstance = ElLoading.service({});
        this.$nextTick(() => {
       // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      }
    },
    goAnchor (selector) {
      document.querySelector(selector).scrollIntoView({
        behavior:"smooth"
      })
    } 
  }
}
</script>

<style scoped>
.title {
  /* text-align: center; */
  font-size: 1.5em;
  line-height: 80px;
  justify-content: center;
  align-items: center;
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
.el-table {
  font-size: 15px;
  color: #232324;
}
.el-aside {
  color: #333;
}
.el-menu-item {
  font-size: 15px;
}

h3 {
  text-align: left;
  /* border-bottom: 2px solid; */
  /* border-bottom-color: rgb(115, 200, 200); */
  padding: 10px;
  background-color: rgb(115, 200, 200);
  color: #e6f0ef;
  border-radius: 10px;
}
a {
  color: #202122;
}
a:hover {
  color: rgb(115, 200, 200);
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
 width:100%;
 
}
/* .body{
  font-family:monospace;
} */

span {
  
  display:inline-block;
  width:100%;
  /* word-wrap:break-word; */
  word-break: break-all;
  white-space:normal ;
  font-family:monospace;

  
}
</style>
