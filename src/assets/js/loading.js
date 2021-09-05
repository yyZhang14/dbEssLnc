import { ElLoading } from 'element-plus';


const showLoading = () =>{
  ElLoading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}


const hideLoading = () =>{
    let loadingInstance = ElLoading.service({});
    this.$nextTick(() => {
       // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstance.close();
    });
}

export {
    showLoading,
    hideLoading
}