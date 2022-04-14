<template>
    <div>
        <el-row class="title" style="color: #606060;">
          <img
          src="../../public/assets/img/back.png"
          class="img_style"
          @click="toUrl()"
         />
            <p>Detail information of {{dataList.Name}}</p>

        </el-row>
       
        <div class="files">
          <h3 class="top">Gene information</h3>
          <div class="content" style="height:40%">
            <el-form label-position="left" inline class="demo-table-expand" >
              <el-form-item label="Name:">
                <span>{{ dataList.Name }}</span>
              </el-form-item>
              <el-form-item label="NONCODE Gene ID:">
                <span @click="toUrl_NONCODE(dataList.NONCODEId)" class="hand">{{ dataList.NONCODEId }}</span>
              </el-form-item>

              <el-form-item label="NCBI Gene ID:">
                
                <span @click="toUrl_NCBI(dataList.NCBI_gene_Id)" class="hand">{{dataList.NCBI_gene_Id}}</span>
                
              </el-form-item>

              <el-form-item label="Aliase">
                <span>{{ dataList.Aliases}}</span>
              </el-form-item>
              <el-form-item label="Reason:" style="width:70%">
                <span>{{ dataList.Reason }}</span>
              </el-form-item>
              <el-form-item label="Organism:" >
                <span>{{ dataList.Organism }}</span>
              </el-form-item>
              <el-form-item label="Gene Ontology Annotations:" style="width:70%">
                <span>{{ dataList.Gene_Ontology_Annotations }}</span>
              </el-form-item>

            </el-form>
          </div>

        </div>
        <div class="files">
          <h3 class="top">Transcripts In Gene</h3>
          <div class="content" style="height:40%">
            <div class="tabletitle" v-if="id==1">
                <el-row>
                    <el-col :span="4" :offset="10">
                        Transcript ID 
                    </el-col>
                </el-row>
            </div>
            <el-table
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            :data="itemData"
            empty-text="N.A."
            border>

            <el-table-column
            label="NONCODE TRANSCRIPT ID"           
            >
                <template #default="props"   >
                    <span  class="hand" @click="toVisual(props.row)">{{ props.row.NONCODE_TRANSCRIPT_ID}}
                    <img
                    src="../../public/assets/img/jump.png"
                    style="width:10px; height:10px"
                    
                    @click="toVisual(props.row)"
                    />
                    </span>
                </template>

            </el-table-column>

            </el-table>
  
          </div>

        </div>


    </div>
</template>

<script>
import axios from "axios";
export default{
    data(){
        return{
            dataList:{},
            itemData:[],
            DNAid:"NONHSAG000195.3",
            tempPage:""


        }
    },
    mounted(){
        this.tempPage = this.$route.query.page
        //console.log("标记Gene页面上个页面从哪里来",this.tempPage)
        if(this.tempPage == "Browse"){          
          this.dataList = JSON.parse(sessionStorage.getItem("dataBrowse"));
        }
        if(this.tempPage == "Search"){          
          this.dataList = JSON.parse(sessionStorage.getItem("dataSearch"));
        }
       
        this.DNAid = this.dataList.NONCODEId;


        axios.post("api/property/transcript",{    
            DNAid:this.DNAid
        }).then(respond =>{
            //console.log(respond.data);
            this.itemData=respond.data;
        });

    },
    methods:{
      toUrl(){
        this.$router.push({
          name:this.tempPage,

        })
      },
//    这是传的什么参数
      toVisual(data){
        sessionStorage.setItem('dataGene', JSON.stringify(data));
        this.$router.push({
          name:'Visual',
          params:data,
          query:{page:this.tempPage}
        })
      },

      toUrl_NCBI(data){
         window.location.href = "https://www.ncbi.nlm.nih.gov/gene/"+data

      },
      toUrl_NONCODE(data){
         window.location.href = "http://www.noncode.org/show_gene.php?id="+data.split(".")[0]+"&version="+data.split(".")[1]+"&utd=1#"
      }
    }

}

</script>

<style>
.hand:hover{
  color:#1ee3cf;
  cursor:pointer
}
</style>