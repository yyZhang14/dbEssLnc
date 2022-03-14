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
        <el-col :span="10"  class="duiqi">
          <i style="font-size: 20px; margin-right: 10px; color: #606060; margin: 40px" class="el-icon-info" >
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
            The page also shows an example of Essential lncRNA,  
            AF113014 over-expression significantly reduced HCC cells proliferation,  whereas AF113014 knockdown promoted cell proliferation.
          </p>
          <p>
            The
            <router-link to="/browse"
              ><b><i>Browse</i></b></router-link
            >
            page categories all essential lncRNA.
            There are three tables,namely "general","tumor suppressor gene" and "oncogene".
            The users can browse all data on this page.
          </p>
          <p>
            The
            <router-link to="/search"
              ><b><i>Search</i></b></router-link
            >
            page provides the ability to search by the name of essential lncRNA.
            If the content of the search box matches the first few letters of the 
            selected search item, a drop down menu will be displayed. The corresponding 
            values will be displayed in a table with links to the original references for each lncRNA.
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
            Currently, <b>200</b> essential lncRNAs are deposited in the
            dbEssLnc database,and new data are constently added by manual screening.
          </p>
          <p>
            Last update on: Mar.13th.2022.
          </p>
        </el-col>
        <el-col :span="10">
          <img
            alt="essential lncRNA"
            src="../../public/assets/img/AF.jpg"
            style="width: 500px; height:500px; margin: 40px;"
          />
          <div>
            <span style="font-size: 14px; float:right;" class="duiqi">
              <b>AF113014 inhibited proliferation of HCC cells in virto.</b>
              <p>(A) Relative expressions of AF113014 in SMMC7721 and Huh-7 cells 
                transfected with Ad-AF113014 or siAF113014. GAPDH was used as 
                reference gene in real-time PCR. 
                (B) Proliferations of SMMC7721 and Huh-7 cells transfected with 
                Ad-AF113014 or siAF113014 were examined by MTS. 
                (C) Proliferations of SMMC7721 and Huh-7 cells transfected with Ad-AF113014 
                or siAF113014 were examined by colony formation assay.</p>
                <a href="https://pubmed.ncbi.nlm.nih.gov/28542387/"> (Tao Zeng et al.,2017)</a>
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
}
</style>
