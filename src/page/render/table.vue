<template>
  <div>
    <list :dataSource="dataSource"> </list>
  </div>
</template>
<script>
import list from "../components/list.vue";
export default {
  components: {
    list
  },
  name: "my-table",
  data() {
    return {
      dataSource: [
        {
          name: "这是标题",
          list: [
            {
              key: "name",
              value: "leo"
            },
            {
              key: "age",
              value: 20
            }
          ]
        },
        {
          name: "",
          list: [
            {
              key: "name",
              value: "leo"
            },
            {
              key: "age",
              value: 20
            }
          ]
        }
      ]
    };
  }

  // render() {
  //   return <div>pppp</div>;
  // }
};
</script>

<style lang="less" scoped></style>
