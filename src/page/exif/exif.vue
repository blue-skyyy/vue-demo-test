<template>
  <div>
    <img :src="url" id="img" />
    <button @click="getExif">点我</button>
  </div>
</template>

<script>
import EXIF from "exif-js";
export default {
  data() {
    return {
      url:
        // "https://img.vipkidstatic.com/beeschool/server/20200820/e3ceb582-3179-437d-8844-875f13977bb8.jpg"
        // "https://img.vipkidstatic.com/beeschool/server/20200825/4088c882-69ed-4f2a-b284-0241af83ce4c.png"
        "https://img.vipkidstatic.com/beeschool/server/20200825/eb627ba4-1238-44b6-8e90-57b35e3e7721.png"
      // "https://img.vipkidstatic.com/beeschool/server/20200825/720d2d06-a81a-4c00-b638-b38aa308ac62.png"
      // "https://img.vipkidstatic.com/beeschool/server/1598339367899/WechatIMG37.jpeg"
      // "https://img.vipkidstatic.com/beeschool/server/1598337872549/WechatIMG35.jpeg"
      // "https://img.vipkidstatic.com/beeschool/server/1598338050051/WechatIMG36.jpeg"
    };
  },
  methods: {
    getExif() {
      this.$nextTick(() => {
        let target = document.getElementById("img");
        EXIF.getData(target, function() {
          var res = EXIF.getAllTags(this);
          console.log("res:", res);
        });
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
img {
  max-width: 500px;
  // transform: rotate(-90deg);
  // height: 500px;
}
</style>
