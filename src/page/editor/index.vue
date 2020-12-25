<template>
  <div class="home">
    <h3>wangEditor with vue</h3>
    <span>测试过啊</span>
    <div id="demo1"></div>
    <button type="button" class="btn" @click="getEditorData">获取当前内容</button>
    <h3>内容预览</h3>
    <textarea name="" id="" cols="170" rows="20" readonly v-model="editorData"></textarea>
  </div>
</template>

<script>
// 引入 wangEditor
import wangEditor from 'wangeditor'
import AlertMenu from './mybtn.js'
export default {
  data() {
    return {
      editor: null,
      editorData: ''
    }
  },
  mounted() {
    const editor = new wangEditor(`#demo1`)

      // 注册菜单
    const menuKey = 'alertMenuKey' // 菜单 key ，各个菜单不能重复
    editor.menus.extend('alertMenuKey', AlertMenu)

    // 将菜单加入到 editor.config.menus 中
    // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
    editor.config.menus = editor.config.menus.concat(menuKey)

        // 上传图片到服务器
        // editor.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
        // editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
        // //自定义上传图片事件
        // editor.customConfig.uploadImgHooks = {
        //     before: function() {

        //     },
        //     success: function() {
        //         console.log("上传成功");
        //     },
        //     fail: function(){
        //         console.log("上传失败,原因是");
        //     },
        //     error: function() {
        //         console.log("上传出错");
        //     },
        //     timeout: function(){
        //         console.log("上传超时");
        //     }
        // }


    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.$nextTick(() => {
              console.log("----", newHtml)
       this.editorData = newHtml
      })
  
    }

        // editor.config.uploadImgServer = 'upload.do'; //设置上传文件的服务器路径

    // 创建编辑器
    editor.create()

    this.editor = editor
  },
  methods: {
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.getJSON()
      // let data = this.editor.getJ
      console.log(data)
    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>


<style>
  .test {
  text-emphasis: dot !important;
  text-emphasis-position: under !important;
  -webkit-text-emphasis:dot !important;
  -webkit-text-emphasis-position:under !important;
}
</style>
<style lang="less">
/deep/ .test {
  text-emphasis: dot !important;
  text-emphasis-position: under !important;
  -webkit-text-emphasis:dot !important;
  -webkit-text-emphasis-position:under !important;
}
  // .home {
  //   width: 1200px;
  //   margin: auto;
  //   position: relative;
  //   .btn {
  //     position: absolute;
  //     right: 0;
  //     top: 0;
  //     padding: 5px 10px;
  //     cursor: pointer;
  //   }
  //   h3 {
  //     margin: 30px 0 15px;
  //   }
  // }
</style>