<template>
  <div>
    <div v-for="(d, i) in list" :key="i" class="row">
      <div v-for="(dd, ii) in d" :key="ii" class="item">
        {{dd}}
      </div>
       
    </div>


<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <polyline :points="points" style="fill:white;stroke:red;stroke-width:4" />
</svg>
 <div id="start">start</div>
  <div id="end">end</div>
  </div>
</template>
<script>
// import * as LeaderLine from "leader-line/leader-line.min.js";
import LeaderLine from 'leader-line-vue';
export default {
  data() {
    return {
      list: [
        [1,3],
        [2,4],
        [5,6]
      ],
      // points: "0,40 40,40 40,80 80,80 80,120 120,120 120,160",
      //  points: "0,40 40,40 40,100",
       points: "0,40 40,40 40,100 800,100",
    }
  },
  mounted() {
    this.$nextTick(() => {
      LeaderLine.setLine(
      document.getElementById('start'),
      document.getElementById('end')
);
//        LeaderLine(
//   document.getElementById('start'),
//   document.getElementById('end')
// );
    })
  }
}
</script>

<style lang="less" scoped>
#start {
  background: red;
  width: 50px;
  height: 50px;
}
#end {
  margin-left: 100px;
  background: green;
  width: 50px;
  height: 50px;
}
p, span, img {
  user-select: none;
}
.row {
  margin-left: 10px;
  overflow: hidden;
  .item {
    width: 50px;
    height: 50px;
    border: 1px solid red;
    float: left;
  }
}

</style>
