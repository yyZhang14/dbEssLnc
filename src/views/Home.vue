<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        src="../../public/assets/img/home.png"
        style="height: 45px; width:auto;vertical-align: middle; margin-right:10px; margin-bottom:5px;"
      />
      Welcome to dbEssLnc
    </el-row>
    <el-row :gutter="100" >
      <div class="wrapper">
        <el-col :span="2">

        </el-col>
        <el-col :span="10"  class="duiqi" >
          <i style="font-size: 20px;  color: #606060; margin: 40px" class="el-icon-info" >
            Introduction of dbEssLnc</i>
          <p>
            <b>dbEssLnc</b> is the abbreviation of <b>Ess</b>ential <b>Lnc</b>RNA
            database. 
          </p>
          <p>
            The
            <router-link to="/home"
              ><b><i>Home</i></b></router-link
            >
            page mainly describes the organization of the dbEssLnc server.
          </p>
          <p>
            The
            <router-link to="/browse"
              ><b><i>Browse</i></b></router-link
            >
            page categories all essential lncRNA.
          </p>
          <p>
            The
            <router-link to="/search"
              ><b><i>Search</i></b></router-link
            >
            page provides the ability to search by the name/aliases/NONCODE gene ID/reason of essential lncRNA.
           
          </p>
          <p>
            The
            <router-link to="/blast"
              ><b><i>Blast</i></b></router-link
            >
            page incorporates the Blast tool for comparing user-entered sequences 
            with those in the dbEssLnc database.
          </p>
          <p>
            The
            <router-link to="/download"
              ><b><i>Download</i></b></router-link
            >
            page list all static links to the data packages and source code in the dbEssLnc
            database.
          </p>
          <p>
            The
            <router-link to="/help"
              ><b><i>Help</i></b></router-link
            >
            page provides three parts: the Tutorial part gives detailed instruction on how to use the dbEssLnc database, 
            the Statistics part shows the basic data analysis of the database according to organism and reason, 
            the Contact part provides information on how to contact authors of the database.
          </p>
          <p>
            Currently, <b>207</b> essential lncRNAs are deposited in the
            dbEssLnc database,and new data are constently added by manual screening.
          </p>
          <p>
            Last update on: May.17th.2022.
          </p>
        </el-col>
        <el-col :span="10">
          <img
            alt="essential lncRNA"
            src="../../public/assets/img/figure1.svg"
            style="width: 600px; margin-top: 90px;"
            
          />
          <div>
            <span style="font-size: 14px; float:right;" class="duiqi">
              <b></b>
              <p>The work flow of data curation process and architecture in dbEssLnc. (A) 
                  Work flow is divided to 5 steps. Step1: Using key words to collect essential 
                  lncRNA data in PubMed. Step2: Screening details of essential lncRNA from literatures.
                   Step3:Mapping gene name to order databases to get other details. Step4: Essential lncRNAs 
                   are categorized as general essential lncRNA, lncRNA tumor suppressor  and lncRNA oncogene. 
                   Step5:Marking “N.A.” for information not collected.
                    (B) Architecture of dbEssLnc. dbEsslnc has seven functional pages, including "Browse", 
                    "Search","Blast","Download","Help", "Gene" and "Visual" page. Users click the gene name in the "Browse" and "Search" 
                    to jump to the "Gene" page for detailed information of gene. "Gene" page can jump to 
                    "Visual" page to get information about lncRNA transcript by clicking gene transcript id in NONCODE.
              </p>
               
            </span>
          </div>
        </el-col >
        <el-col :span="2">

        </el-col>
      </div>

    </el-row>
  </div>
</template>

<script>

</script>


<style scoped>
.title {
  text-align: center;
  font-size: 1.5em;
  line-height: 80px;
  justify-content: center;
  align-items: center;
  height: 80px;
  background: #e6f0ef; 
  background: -moz-linear-gradient(
    -45deg,
    #e6f0ef 45%,
    #b4ede7 100%
  ); 
  
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
.duiqi{
  text-align: justify; 
 
}
.wrapper{
  display:flex;
  align-item:center;
  padding-left:10px;
}
.wrapper p{
  line-height:200%;
  font-size:16px;
}
</style>
