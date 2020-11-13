<template>
  <div>
    <h1>My title</h1>
    Some text content
    <renderCom :blogTitle="blogTitle">
      这是slot部分
    </renderCom>
  </div>
</template>

<script>
export default {
  data() {
    return { blogTitle: "blogTitle" };
  },
  // data: {
  //   name: "leo"
  // },
  components: {
    renderCom: {
      data() {
        return {
          name: {
            a: "1",
            b: "2"
          }
        };
      },
      render(h) {
        return h(
          "h1",
          {
            on: {
              click: this.clickHandler
            }
          },
          [this.blogTitle, this.$slots.default]
        );
        // return h(
        //   "div",
        //   {
        //     on: {
        //       click: this.clickHandler
        //     }
        //   },
        //   [
        //     new Array(2).fill(2).map(() => {
        //       return h("p", "hi");
        //     }),
        //     this.$slots.default
        //   ]
        // );
      },
      methods: {
        clickHandler() {
          console.log("this.data", this);
          // alert("clickEvent");
        }
      },
      props: {
        blogTitle: String
      }
    }
  }
};
</script>
