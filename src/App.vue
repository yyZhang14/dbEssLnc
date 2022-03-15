<template>
  <div id="app">
    <!-- <router-view v-if="isReload"/> -->
    <app-header></app-header>
    <router-view :key="$route.fullPath" v-if="isRouterAlive"></router-view>
    <app-footer></app-footer>
    <!-- 滑动页面，可以有返回最顶端按钮 -->
    <!-- 返回顶部按钮 -->
    <el-backtop>
      <div
        style="{
                        height: 100%;
                        width: 100%;
                        background-color: #f2f5f6;
                        box-shadow: 0 0 6px rgba(0,0,0, .12);
                        text-align: center;
                        line-height: 40px;
                        color: rgb(115, 200, 200);
                    }"
      >
        TOP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import header from "./components/Header.vue";
import footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    appHeader: header,
    appFooter: footer
  },
  provide () {
    return {
      reload:this.reload
    }
  },
  data () {
    return {
      isRouterAlive : true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      // this.isReload = false
      this.$nextTick(function () {
        this.isRouterAlive = true
        // this.isReload = true
        
      })
    }
  }
  // watch:{
  //   $route(to,from){
  //     if(to.path === '/visual'){
  //       console.log("visual进去")
  //       // setTimeout(() => {
  //       //   window.location.reload(true);
  //       // }, 5000);
        
  //     }


      
  //     console.log(from.path, 'fromApp');
  //     console.log(to.path, 'toApp');
  //   }
  // }
};
</script>

<style>
html,
body,
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #202122; */
  margin: 0;
  padding: 0;
  height: 100%;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
}
.app-main {
  /* position: absolute;
  margin-top: 0; */
  width: 100%;
  /* height: 100%; */
  padding: 20px 0;
  margin: 0;
  -webkit-box-shadow: 0px 0px 5px #ccc;
  -moz-box-shadow: 0px 0px 5px #ccc;
  -ms-box-shadow: 0px 0px 5px #ccc;
  box-shadow: 0px 0px 5px #ccc;
  /* background: #e6f0ef; */
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

  /* padding: 20px; */
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  border-radius: 5px;
  /* padding-bottom: 40px; */
}
</style>
