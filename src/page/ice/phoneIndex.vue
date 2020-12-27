<template>
  <div>
    <div id="divMove"
         style="height: 100px;">胡奥东</div>
    <div id="slideDiv"
         style="width: 300px; height:30px;background-color:#AA967D;">
      哥哥
      <button id="btnDelete"
              style="display: none;">删除</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$nextTick(() => {
      this.test();
    })
  },

  methods: {
    test () {
      let touchGlobal;
      document.getElementById("slideDiv").addEventListener("touchstart", function (e) {
        touchGlobal = e.touches[0];

      }, false);
      document.getElementById("slideDiv").addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var x = Number(touch.pageX);
        document.getElementById("divMove").innerHTML = x;
        if (touchGlobal.pageX - x > 0) {
          document.getElementById("btnDelete").setAttribute("style", "display: inline");
        }
        else {
          document.getElementById("btnDelete").setAttribute("style", "display: none");
        }
      }, false);
      document.getElementById("slideDiv").addEventListener("touchend", function () {
        console.log("essd")
      }, false);
    }
  }
}
</script>
