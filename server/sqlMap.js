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
      "select * from `final` where Organism ='Human'",
       //organism is mouse
      selectMouse:
      "select * from `final` where Organism ='Mouse'",

      //reason is vital
      select_reason_vital:
      "select * from `final` where Role ='General'",
      //reason is tumor
      select_reason_tumor:
      "select * from `final` where Role ='Tumor suppressor gene'",
      //reason is cancer
      select_reason_cancer:
      "select * from `final` where Role ='Oncogene'",


      //fuzzy search 模糊查询
      searchHuman:
      'select * from `final` where Organism ="Human" AND concat(Name,Aliases,NONCODEId,Reason) like "%"?"%"',
      searchMouse:
      'select * from `final` where Organism ="Mouse" AND concat(Name,Aliases,NONCODEId,Reason) like "%"?"%"',
      searchVital:
      'select * from `vital` where  concat(Name,Aliases,NONCODEId,Reason) like "%"?"%"',
      searchTumor:
      'select * from `tumor` where  concat(Name,Aliases,NONCODEId,Reason) like "%"?"%"',
      searchCancer:
      'select * from `cancer` where concat(Name,Aliases,NONCODEId,Reason) like "%"?"%"',
      //用于模糊查询的输入建议
      fuzzyHuman:
      "select Name from `final` where Organism ='Human' order by Name",
      fuzzyMouse:
      "select Name from `final` where Organism ='Mouse' order by Name",
      fuzzyVital:
      "select Name from `vital`  order by Name",
      fuzzyTumor:
      "select Name from `tumor`  order by Name",
      fuzzyCancer:
      "select Name from `cancer` order by Name",
      //用于blast页面 通过 转录本id 查找对应的内容
      // fuzzySeq:
      // 'select * from `trans` where NONCODE_TRANSCRIPT_ID in (?)',
      // "select * from `trans` where NONCODE_TRANSCRIPT_ID in ("?")"
      //用于 visual 页面 ，通过ID 查询对应的内容，做可视化
      profile:
      'select * from `expression` where RNAID = ?',
      transcript:
      'select * from `trans` where NONCODE_Gene_ID = ?'
    
      
    }
  };
  
  module.exports = sqlMap;
  