<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        src="../assets/img/home.png"
        style="height: 45px; vertical-align: middle; margin-right: 20px;"
      />
      Welcome to dbEssLnc
    </el-row>
    <el-row class="content" type="flex" justify="space-between">
      <el-col :span="10">
        <i
          style="font-size: 20px; margin-right: 10px; color: #606060;"
          class="el-icon-info"
        >
        Introduction of dbEssLnc</i
        >
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
          page categories all essential lncRNA. The users can browse all data on this page.
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
          <router-link to="/balst"
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
          page list all static links to the data packages in the dbEssLnc
          database.
        </p>
        <p>
          The
          <router-link to="/help"
            ><b><i>Help</i></b></router-link
          >
          page provides step-by-step instructions on how to use the dbEssLnc
          database.
        </p>
        <p>
          Currently, <b>176</b> essential lncRNA are deposited in the
          dbEssLnc database,and new data are constently added by manual screening.
        </p>
        <p>
          Last update on: Sep.3rd.2021.
        </p>
      </el-col>

      <el-col :span="10">
        <img
          alt="essential lncRNA"
          src="../assets/img/reviewLncRNA.png"
          style="max-width:100%; height:auto; margin: 10px;"
        />
        <div style="max-width: 100%;">
          <span style="font-size: 12px; float:right;"
            >Aliperti, V.; Skonieczna, J.; Cerase, A. Long Non-Coding RNA (lncRNA) Roles in Cell Biology, Neurodevelopment and Neurological Disorders. Non-Coding RNA 2021, 7, 36. https://doi.org/10.3390/ncrna7020036</span
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

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
.el-row {
  height: 100%;
}
.content {
  padding: 20px 10%;
  margin: 0 auto;
  text-align: left;
}
.content p {
  /* 行间距 */
  line-height: 1.5em;
  /* 首行缩进 */
  /* text-indent: 2em; */
  /* 两端对齐 */
  text-align: justify;
}
.content p a {
  color: #202122;
}
</style>
