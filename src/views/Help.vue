<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        src="../../public/assets/img/help.png"
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
            of the diseases or tumors.Here,we developed a database named dbEssLnc 
            (<b><a href="https://esslnc.pufengdu.org">https://esslnc.pufengdu.org</a></b>),which manually 
            collects and collates essential lncRNAs information from existing databases and published 
            literature. Currently, the dbEssLnc database contains <b>191</b> essential lncRNAs , 
            and the data will be continuously added and updated.
          </p>
        </el-collapse-item>

        <el-collapse-item title="2. Browse help" name="2">
          <p>
            <strong>(1).</strong> Users can browse information of essential lncRNAs 
            and their original references. The navigation bar on the left side shows 
            all the contents users can browse in the 'Browse' page. It takes some time to
            load data when opening the page.The sidebar of the web page allows you to anchor
             three tables. There is a button on the right side of the table to expand the data in more detail.
          </p>
          <img alt="browse help" src="../../public/assets/img/help/bro1.png" />

          <p>
            <strong>(2).</strong> The NCBI_gene_Id and PubMed  in the table can directly go to the NCBI
             website to read gene and article information.
          </p>
          <img alt="browse help" src="../../public/assets/img/help/bro2.png" />

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
          <img alt="search help" src="../../public/assets/img/help/sea1.png" />
          <p>
            <strong>(2).</strong> Clich on the button to expand the folding panel to read more essential lncRNAs information.
          </p>
          <img alt="search help" src="../../public/assets/img/help/sea2.png" />
          <p>
            <strong>(3).</strong>  The query box supports wildcard queries using '_' and '%'.
             Where '_' can match any single character, and '%' matches any number of characters.
          </p>
          <img alt="search help" src="../../public/assets/img/help/sea3.png" />
          <img alt="search help" src="../../public/assets/img/help/sea4.png" />
        </el-collapse-item>

        <el-collapse-item title="4. Blast help" name="4">
          <p>
            <strong>(1).</strong>
            In the 'Blast' page, the user can enter the lncRNA sequence in FASTA format for  
            alignment with sequence stored in the database，and the results of sequence 
            alignment will  be display below.
             Enter lncRNA sequence or click 'Example' to use template lncRNA sequence.
          </p>
          <img alt="batch convert help" src="../../public/assets/img/help/bla1.png" />
          <p>
            <strong>(2).</strong>
            Set e-value and word size,then click 'Blast' button to doing sequence alignment, the result will be shown in following table.
          </p>
          <img alt="bacth convert help" src="../../public/assets/img/help/bla2.png" />
        </el-collapse-item>
        <el-collapse-item title="5. Download help" name="5">
          <p>
            <strong>(1).</strong> Users can download all data and source code of dbEssLnc database.
          </p>
          <img alt="download help" src="../../public/assets/img/help/down.png" />
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="perspective">
      <h3>Statistics</h3>
      <div class="setborder">
        <p>Currently,this dbEssLnc database include <b>200</b> essential lncRNAs.</p>
        <p>Sorted by organsim, there are <b>173</b> essential lncRNAs belonging to human and <b>27</b> essential lncRNAs belonging to mouse.</p>
        <p>Sorted by reason, there are <b>32</b> essential lncRNAs belonging to general essential lncRNA
          , <b>69</b> essential lncRNAs belonging to tumor suppressor gene
          and <b>99</b> essential lncRNAs belonging to oncogene.</p>
        <div id ="first"></div>
        <div id ="second"></div>

      
      </div>
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
import echarts from "echarts"
export default {
  data() {
    return {
      activeName: ["1"]
    };
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine (){
      var chartDom1 = document.getElementById('first');
      var myFirstChart = echarts.init(chartDom1);

      var chartDom2 = document.getElementById('second');
      var mySecondChart = echarts.init(chartDom2);
      var colors=['#D3E397','#d9d9f3','#96ceb4','#ffad60','#d9534f'];

      var option1 = {
      title: {
        text: 'Group by Organism',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['Human', 'Mouse']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
      trigger: 'item'
      },
      series: [
        {
        data: [{value:173,name:'Human'},{value:27,name:'Mouse'}],
        type: 'bar',
        itemStyle:{
          normal:{
            color:function (params) {
              return colors[params.dataIndex];
            },
              label:{
                show:true,
                position:'top',
                color:'black'
              }
          }
        },
        barWidth:'40%'
        }
      ]
    };
    var option2 = {

    title: {
      text: 'Group by Reason',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['general essential lncRNA', 'tumor suppressor gene', 'oncogene']
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        data: [32,69, 99],
        type: 'bar',
        itemStyle:{
          normal:{
              color:function (params) {
              return colors[params.dataIndex+2];
            },
            label:{
                show:true,
                position:'top',
                color:'black'
              }
          }        
        },
        barWidth:'50%'
      }
    ]
  };

    myFirstChart.setOption(option1);
    mySecondChart.setOption(option2);


    }
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

:deep(.el-collapse-item__header) {
  font-size: 16px;
  padding-left: 20px;
}

:deep( .el-collapse-item__content ){
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
#first{
  width:800px;
  height:500px;
  display: inline-block;

}
#second {
    width:800px;
    height:500px;
    display: inline-block;

}

</style>
