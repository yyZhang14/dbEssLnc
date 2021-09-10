// sql语句
var sqlMap = {
    property: {
      // 显示数据 
      //show final table data
      
      selectFinal: "select * from `final` ",
      //show essential lncRNA
      selectVital:"select * from `vital`",
      //show tumor suppressor genes
      selectTumor:"select * from `tumor`",
      //show essential lncRNA in cancer cell
      selectCancer:"select * from `cancer`",

      //search page
      //organism is human
      selectHuman:
      "select * from `final` where Organism ='human'",
       //organism is mouse
      selectMouse:
      "select * from `final` where Organism ='mouse'",

      //reason is vital
      select_reason_vital:
      "select * from `final` where Role ='essential lncRNA'",
      //reason is tumor
      select_reason_tumor:
      "select * from `final` where Role ='tumor suppressor genes'",
      //reason is cancer
      select_reason_cancer:
      "select * from `final` where Role ='essential lncRNA in cancer cell'",


      //fuzzy search 
      searchHuman:
      'select * from `final` where Organism ="human" AND Name like "%"?"%"',
      searchMouse:
      'select * from `final` where Organism ="mouse" AND Name like "%"?"%"',
      searchVital:
      'select * from `final` where Role="essential lncRNA" AND Name like "%"?"%"',
      searchTumor:
      'select * from `final` where  Role="tumor suppressor genes" AND Name like "%"?"%"',
      searchCancer:
      'select * from `final` where  Role="essential lncRNA in cancer cell" AND Name like "%"?"%"',
      //用于模糊查询的输入建议
      fuzzyHuman:
      "select Name from `final` where Organism ='human' order by Name",
      fuzzyMouse:
      "select Name from `final` where Organism ='mouse' order by Name",
      fuzzyVital:
      "select Name from `final` where Role='essential lncRNA' order by Name",
      fuzzyTumor:
      "select Name from `final` where Role='tumor suppressor genes' order by Name",
      fuzzyCancer:
      "select Name from `final` where Role='essential lncRNA in cancer cell' order by Name",
      //用于blast页面 通过sequence  查找对应的内容
      fuzzySeq:
      'select * from `final` where fasta  like "%"?"%"'

    
      
    }
  };
  
  module.exports = sqlMap;
  