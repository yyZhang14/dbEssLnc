<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        src="../assets/img/help.png"
        style="height: 45px; width: auto;  vertical-align: middle; margin-right: 20px;"
      />
      Help
    </el-row>
    <div class="perspective">
      <h3>Tutorial</h3>
      <el-collapse v-model="activeName" accordion class="content">
        <el-collapse-item title="1. Overview" name="1">
          <p>
           Essential lncRNAs are important for fundamental cellular processes including 
           gene expression regulation and signal pathways,even concerned with the progression
            of the diseases or tumors.Here,we developed a database named dbEssLnc ,which manually 
            collects and collates essential lncRNAs information from existing databases and published 
            literature. Currently, the dbEssLnc database contains <b>176</b> essential lncRNAs , 
            and the data will be continuously added and updated.
          </p>
        </el-collapse-item>
        <!-- <el-collapse-item title="2. 'Home' page help" name="2">
        <div>
          home page 内容待修改
        </div>
        <img alt="home help" src="../assets/help/homehelp.png" />
      </el-collapse-item> -->
        <el-collapse-item title="2. Browse help" name="2">
          <p>
            <strong>(1).</strong> Users can browse information of essential lncRNAs 
            and their original references. The navigation bar on the left side shows 
            all the contents users can browse in the 'Browse' page. It takes some time to
            load data when opening the page.
          </p>
          <img alt="browse help" src="../assets/img/help/bro.png" />

        </el-collapse-item>
        <el-collapse-item
          title="3. Descriptions about 'Search' page and Fuzzy search"
          name="3"
        >
          <p>
            <strong>(1).</strong> The picture below is an introduction to the
            'Search' page. A dropdown menu will be displayed if the content of
            the search box matches the first few letters of the names of
            essential lncRNAs.
          </p>
          <img alt="search help" src="../assets/img/help/sea1.png" />
          <p>
            <strong>(2).</strong> When the type is not chosen, all
            essential lncRNAs with a matching name will be displayed. 
          </p>
          <img alt="search help" src="../assets/img/help/sea2.png" />
          <p>
            <strong>(3).</strong>  The query box supports wildcard queries using '_' and '%'.
             Where '_' can match any single character, and '%' matches any number of characters.
          </p>
          <img alt="search help" src="../assets/img/help/sea3.png" />
          <img alt="search help" src="../assets/img/help/sea4.png" />
        </el-collapse-item>
        <!-- <el-collapse-item title="4. Convert and Visualization" name="4">
          <p>
            In the 'Visualization' page, users can convert FASTA format
            nucleotide sequences into numerical sequences according to selected
            physicochemical properties, with basic <i>k</i>-mers of the
            sequences as intermediate results.
          </p>
          <p>
            <strong>(1).</strong> When users have selected the first three
            parameters, the corresponding physicochemical properties will be
            displayed for the users to choose. Due to the limited computational
            resources, users should set the maximum number of selectable
            physicochemical properties, which is 5 by default.
          </p>
          <img alt="convert help" src="../assets/img/help/sta.png" />

          <p>
            <strong>(2).</strong> After step (1), users can enter DNA or RNA
            sequences in FASTA format or click on the 'Example' button to get an
            example sequence. When the user clicked the 'Get value' button, the
            <i>k</i>-mers and the numerical series will be displayed. Clicking
            the ‘Visualize’ button will display multiple curves on a new page.
          </p>
          <img alt="convert help" src="../assets/img/help/sta.png" />
          <p>
            <strong>(3).</strong> The graphs are visualization results of (1)
            (2), which can be shown as either multiple graphs of all sequences
            or mean curves. Users can download the graphs locally.
          </p>
          <img alt="convert help" src="../assets/img/help/sta.png" />
          <img alt="convert help" src="../assets/img/help/sta.png" />
        </el-collapse-item> -->
        <el-collapse-item title="4. Blast help" name="4">
          <p>
            <strong>(1).</strong>
            In the 'Blast' page, the user can enter the lncRNA sequence in FASTA format for  
            alignment with sequence stored in the database，and the results of sequence 
            alignment will  be display below.
             Enter lncRNA sequence or click 'Example' to use template lncRNA sequence.
          </p>
          <img alt="batch convert help" src="../assets/img/help/bla1.png" />
          <p>
            <strong>(2).</strong>
            Set e-value and word size,then click 'Blast' button to doing sequence alignment, the result will be shown in following table.
          </p>
          <img alt="bacth convert help" src="../assets/img/help/bla2.png" />
        </el-collapse-item>
        <el-collapse-item title="5. Download help" name="5">
          <p>
            <strong>(1).</strong> Users can download all data and source code of dbEssLnc database.
          </p>
          <img alt="download help" src="../assets/img/help/down.png" />
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="perspective">
      <h3>Contact</h3>
      <div class="setborder">
        <p>
          For any suggestions, technical issues, data depositions and error
          reports, please contact Dr. Pu-Feng Du by email (<a
            href="mailto:pdu@tju.edu.cn"
            >pdu@tju.edu.cn</a
          >).
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
      activeName: ["1"]
    };
  }
};
</script>
<style scoped >
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

.content {
  /* width: 90%; */
  margin: 10px auto;
  padding: 2px;
  border: 2px solid #b4ede7;
  border-radius: 10px;
  background-color: #b4ede7;
}

.content img {
  width: 90%;
  height: auto;
}

/deep/ .el-collapse-item__header {
  font-size: 16px;
  padding-left: 20px;
}

/deep/ .el-collapse-item__content {
  border-top: 1px solid #b4ede7;
}

p {
  font-size: 16px;
  line-height: 1.5em;
  text-align: justify;
  padding: 0 30px;
}

.perspective {
  width: 90%;
  margin: 0 auto;
}

.setborder {
  border: 2px solid #b4ede7;
  border-radius: 10px;
}

h3 {
  text-align: left;
  padding: 10px;
  background-color: rgb(115, 200, 200);
  color: #e6f0ef;
  border-radius: 10px;
}
</style>
