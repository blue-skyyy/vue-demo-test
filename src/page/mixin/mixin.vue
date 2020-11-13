<template>
  <div>dd</div>
</template>

<script>
const mixin1 = {
  data() {
    return {
      name: "dd"
    };
  },
  created() {
    console.log("我是第一个输出的");
  }
};

const mixin2 = {
  data() {
    return {
      age: 10
    };
  },
  created() {
    console.log("我是第二个输出的");
  }
};
export default {
  mixins: [mixin1, mixin2],
  data() {
    return {
      name: "leo"
    };
  },
  created() {
    console.log("this.$data", this._data); // {age:10, name: "leo"}
    console.log("我是第三个输出的");
  }
};
</script>
