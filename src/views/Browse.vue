<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        style="margin-right: 20px; height: 55px; width: 55px; vertical-align: middle;"
        src="../assets/img/browse.png"
      />
      Browse all
    </el-row>
    <el-container style="height: expression(document.body.clientHeight-130px); border: 1px solid #eee">
      <!-- 侧边导航栏 -->
      <el-aside 
        width="200px"
        style="background-color: rgb(238, 241, 246); text-align:left;">
        <el-menu :default-openeds="['1', '2']">
           <el-submenu index="1">
            <template v-slot:title>
              <i class="el-icon-s-grid"></i><b>Browse</b>
            </template>

            <el-menu-item index="1-1">
              <a href="#lncrna">essential lncRNA</a>
            </el-menu-item>
          </el-submenu>

           <el-submenu index="2">
            <template v-slot:title>
              <i class="el-icon-document"></i><b>Renferences</b>
            </template>

            <el-menu-item index="2-1">
              <a href="#reference">references</a>
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <!-- 显示表格 -->
      <el-container >
        <el-main class="browseBody">
          <!-- 显示essential lncRNA -->
          <div>
            <h3><a name="lncrna"></a>Essential lncRNA</h3>
            <el-table
            :data = "lncrna"
            :header-cell-style ="{background:'#eef1f6',color:'#606266'}"
            height="400"
            empty-text="cannot find"
            border
            stripe
            style="width: 100%"
            strip highlight-current-row
            >
            <el-table-column type="expand">
              <template #default="props">
                <el-form label-position="left" inline class="demo-table-expand" >
                  <el-form-item label="ID:">
                    <span>{{ props.row.ID }}</span>
                  </el-form-item>
                  <el-form-item label="Name:" width="150">
                   <span>{{ props.row.Name }}</span>
                  </el-form-item>
                  <el-form-item label="Reason:">
                    <span>{{ props.row.Reason }}</span>
                  </el-form-item>
                  <el-form-item label="ReferID:">
                    <span>{{ props.row.ReferID }}</span>
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
            <el-table-column
              label="ID"
              prop="ID"
              width="100">
            </el-table-column>
            <el-table-column
              label="Name"
              prop="Name"
              width="100">
            </el-table-column>
            <el-table-column
              label="NONCODEId"
              prop="NONCODEId">
            </el-table-column>
            <el-table-column
              label="NCBI gene ID"
              prop="NCBI_gene_Id"
              width="120">
            <template #default="scope">
              <a :href="urlNCBI+scope.row.NCBI_gene_Id" target="_black">
                {{scope.row.NCBI_gene_Id}}
              </a>
            </template>

            </el-table-column>
            <el-table-column
              label="Aliases/full Name"
              prop="Aliases/full_Name"
              width="500">
            </el-table-column>
            <!-- <el-table-column
              label="ReferID"
              prop="ReferID"
              width="100">
            </el-table-column> -->
            <el-table-column
              label="Organism"
              prop="Organism">
            </el-table-column>

            </el-table>    
          </div>
          <!-- 显示参考文献 -->
          <div>
            <h3><a name="reference"></a>References</h3>
            <el-table
              :data="references"
              :header-cell-style ="{background:'#eef1f6',color:'#606266'}"
              height="400"
              empty-text="cannot find"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column prop="ReferID" label="ReferID" width="100">
              </el-table-column>
              <el-table-column prop="PubMedID" label="PubMedID" width="100">
                <template #default="scope">
                  <a :href="url+scope.row.PubMedID" target="_black">
                    {{scope.row.PubMedID}}
                  </a>
                </template>
              </el-table-column>
              <el-table-column prop="Reference" label="Reference">
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
      references:[],
      lncrna:[], 
      // fullscreenLoading: false
    }
  },
  mounted () {
      ElLoading.service({
        fullscreen:true,
        text:"Loading...",
        background:"rgba(0,0,0,0.7)"
      });
      axios.post("api/property/lncrna").then(respond =>{
      this.lncrna = respond.data; 
    });
    axios.post("api/property/references").then(respond =>{
    this.references = respond.data;
    });

    let loadingInstance = ElLoading.service({});
    this.$nextTick(() => {
       // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstance.close();
    });
    
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
