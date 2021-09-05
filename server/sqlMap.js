// sql语句
var sqlMap = {
    property: {
      // 显示数据 /NCBI
      selectLncRNA: "select * from `essential` ",
      //organism is human
      selectHuman:
      "select * from `essential` where Organism ='human'",
       //organism is mouse
      selectMouse:
      "select * from `essential` where Organism ='mouse'",
      //NCBI_gene_Id is not null
      selectNCBI:
      'select * from `essential` where NCBI_gene_Id is not null',
      //NONCODEId is not null
       selectNONCODE:
       "select * from `essential` where NONCODEId is not null",
        // 显示参考文献
       references:"select * from `ref`",

      //搜索数据
      searchHuman:
      'select * from `essential` where Organism ="human" AND Name like "%"?"%"',
      searchMouse:
      'select * from `essential` where Organism ="mouse" AND Name like "%"?"%"',
      searchNCBI:
      'select * from `essential` where NCBI_gene_Id is not null AND Name like "%"?"%"',
      searchNONCODE:
      'select * from `essential` where  NONCODEId is not null AND Name like "%"?"%"',
      //用于模糊查询的输入建议
      fuzzyHuman:
      "select Name from `essential` where Organism ='human' order by Name",
      fuzzyMouse:
      "select Name from `essential` where Organism ='mouse' order by Name",
      fuzzyNCBI:
      "select Name from `essential` where NCBI_gene_Id is not null order by Name",
      fuzzyNONCODE:
      "select Name from `essential` where NONCODEId is not null order by Name",
      //用于blast页面 通过sequence  查找对应的内容
      fuzzySeq:
      'select * from `essential` where fasta  like "%"?"%"'

    
      
    }
  };
  
  module.exports = sqlMap;
  