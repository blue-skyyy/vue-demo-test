<template>
  <div>
    这是grandSon
    <p>attrs:{{ $attrs }}</p>
    <p>listeners:{{ $listeners }}</p>
    <button @click="test">点我</button>
  </div>
</template>
<script>
export default {
  methods: {
    test() {
      this.$emit("m1", "grandson");
    }
  }
};
</script>
