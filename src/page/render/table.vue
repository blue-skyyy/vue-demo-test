<template>
  <div>
    <list :dataSource="dataSource"> </list>
  </div>
</template>
<script>
import list from "./list.vue";
export default {
  components: {
    list
  },
  name: "my-table",
  data() {
    return {
      dataSource: 

      [
  {
    "tag": "p",
    "attrs": [],
    "children": [
      {
        "tag": "b",
        "attrs": [],
        "children": [
          "解析解析解析",
          {
            "tag": "img",
            "attrs": [
              {
                "name": "src",
                "value": "https://img.vipkidstatic.com/beeschool/server/1607673600664/64x64.png"
              },
              {
                "name": "style",
                "value": ""
              },
              {
                "name": "width",
                "value": "52"
              },
              {
                "name": "height",
                "value": "52"
              }
            ],
            "children": []
          },
          "测试测试测试"
        ]
      }
    ]
  }
]
      // dataSource: [
      //   {
      //     name: "这是标题",
      //     list: [
      //       {
      //         key: "name",
      //         value: "leo"
      //       },
      //       {
      //         key: "age",
      //         value: 20
      //       }
      //     ]
      //   },
      //   {
      //     name: "",
      //     list: [
      //       {
      //         key: "name",
      //         value: "leo"
      //       },
      //       {
      //         key: "age",
      //         value: 20
      //       }
      //     ]
      //   }
      // ]
    };
  }

  // render() {
  //   return <div>pppp</div>;
  // }
};
</script>

<style lang="less" scoped></style>
