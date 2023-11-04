<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 350px; overflow-y: hidden;"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import "@wangeditor/editor/dist/css/style.css"
  import store from "../store"
  export default {
    name: "RichTextEditor",
    components: { Editor, Toolbar },
    props:{
      content:{
        type:String,
        required:false,
        default:"",
      },
    },
    data() {
      return {
        editor: null,
        html: '',
        toolbarConfig: { 
          toolbarKeys:[
            "header1",
            "header2",
            "header3",
            "bulletedList",
            "numberedList",
            "uploadImage",
          ]
        },
        editorConfig: {
          placeholder: '请输入内容...',
          autofocus:false,
          scroll:true,
          MENU_CONF:{
            'uploadImage':{

              fieldName: 'imgFile',

              server:'/efms/uploadimg',

               // 单个文件的最大体积限制，默认为 2M
              maxFileSize: 1 * 1024 * 1024, // 1M

              // 最多可上传几个文件，默认为 100
              maxNumberOfFiles: 5,

              // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
              allowedFileTypes: ['image/*'],

              // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
              meta: {
                  token: store.getters.getToken,
              },

              // 将 meta 拼接到 url 参数中，默认 false
              metaWithUrl: false,

              // 自定义增加 http  header
              headers: {
                  Accept: 'text/x-json',
              },

              // 跨域是否传递 cookie ，默认为 false
              withCredentials: true,

              // 超时时间，默认为 10 秒
              timeout: 5 * 1000, // 5 秒
            }
          }
        },
        mode: 'simple',
      }
    },
    watch:{
      content(val){
        this.html=val
      },
    },
    methods: {
      onCreated(editor) {
        this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        editor.getAllMenuKeys();
      },
      getContent(){
        return this.html;
      },
      Clear(){
        this.html="<p><br></p>";
      },
      isEmpty(){
        var str=this.html.replace(/<[^<p>]+>/g, '')  // 将所有<p>标签 replace ''
                         .replace(/<[</p>$]+>/g, '')  // 将所有</p>标签 replace ''
                         .replace(/&nbsp;/gi, '')  // 将所有 空格 replace ''
                         .replace(/<[^<br/>]+>/g, '') // 将所有 换行符 replace ''

        if (str == '') return true
        var regu = '^[ ]+$'
        var re = new RegExp(regu)
        return re.test(str)
      }
    },
    beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      else{
        editor.clear()
        editor.destroy() // 组件销毁时，及时销毁编辑器
      }

    }
  }
</script>

<style src="@wangeditor/editor/dist/css/style.css" scoped>

</style>
