<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    largeImg(src) {
      console.log('largeImg====', src)
    },
    renderVnode(h, data) {
      // let that = this
      let children = []
      data.forEach(element => {
        let type = Object.prototype.toString.call(element)
        let obj = {}
        let ele = {}
        obj.tag = element.tag
        if (type === '[object Object]') {
          let attrs = {}
          element.attrs.forEach(attr => {
            attrs[attr.name] = attr.value 
          })
          obj.attrs = attrs
          if (element.children && element.children.length > 0) {
            obj.children = this.renderVnode(h, element.children)
          }
          if (element.tag === 'img') {
            // obj.on = {
            //   click: that.largeImg.bind(that, obj.attrs.src)
            // }
            ele = h(obj.tag, {
              attrs: obj.attrs,
              // on: obj.on
            })
          } else {
            ele = h(obj.tag, {
              attrs: obj.attrs,
              // on: obj.on
            }, obj.children) 
          }
          
        } else if (type === '[object String]') {
          obj.tag = 'span'
          ele = h(obj.tag, element)
        }
        children.push(ele)
      })
      return children
    }
  },
  
  render(h) {
    let result = this.renderVnode(h, this.dataSource)
    console.log("result", result)
    return h('div', result)
  }
  // render(h) {
  //   return h(
  //     "div",
  //     {
  //       class: "list"
  //     },
  //     [
  //       this.dataSource &&
  //         this.dataSource.length &&
  //         this.dataSource.map((d) => {
  //           return h(
  //             "div",
  //             {
  //               class: "row"
  //             },
  //             [
  //               h(
  //                 "p",
  //                 {
  //                   class: "th"
  //                 },
  //                 d.name || "暂无数据"
  //               ),
  //               h(
  //                 "div",
  //                 {
  //                   class: "tr-body",
  //                   style: {}
  //                 },
  //                 [
  //                   d.list &&
  //                     d.list.length &&
  //                     d.list.map((item) => {
  //                       return h(
  //                         "div",
  //                         {
  //                           class: "tr-body-item"
  //                         },
  //                         item.value
  //                       );
  //                     })
  //                 ]
  //               )
  //             ]
  //           );
  //         })
  //     ]
  //   );
  // }
};
</script>
<style lang="less" scoped>
.list {
  width: 500px;
  margin: 0 auto;
  border: 1px solid rgba(72, 41, 54, 0.2);
  .row {
    .th {
      margin: 0;
      padding: 0;
      background: #ede3e7;
      padding: 5px 0px;
    }
    .tr-body {
      display: flex;
      padding: 3px 0px;

      box-sizing: border-box;
      .tr-body-item {
        padding: 6px 0px;
        flex: 1;
      }
      .tr-body-item:nth-child(odd) {
        border-right: 1px solid rgba(93, 49, 49, 0.2);
      }
    }
  }
}
</style>
