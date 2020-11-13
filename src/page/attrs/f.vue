<template>
  <div>
    这是父 attrs:{{ this.$attrs }} listeners: {{ this.$listeners }}
    <son :name="name" :age="age" @m1="m1"></son>
  </div>
</template>
<script>
import son from "./s.vue";
export default {
  inheritAttrs: true,
  components: {
    son: son
  },
  data() {
    return {
      name: "leo",
      age: 12
    };
  },
  methods: {
    m1(value) {
      console.log(value);
    },
    m2() {
      console.log("M2");
    }
  }
};
</script>
