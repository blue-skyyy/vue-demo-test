<template>
  <div>
    这是son
    <p>name:{{ $attrs.name }}</p>
    <p>attrs:{{ $attrs }}</p>
    <p>listeners: {{ this.$listeners }}</p>
    <grandson v-bind="$attrs" v-on="$listeners"></grandson>
  </div>
</template>
<script>
import gs from "./gs.vue";

export default {
  props: ["name"],
  components: {
    grandson: gs
  }
};
</script>
