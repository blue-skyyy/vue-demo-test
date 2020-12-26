<template>
  <div class="container">

    <button @click="mylog">输出 </button>
    <div class="game-container">

      <div class="game-box"
           :style="setGameBoxHeight(rowCol.col, rowCol.row)">
        <div class="item"
             :style="setPos(list[index].position)"
             v-for="(d, index) in Array(list.length)"
             :key="index">
          <div v-if="list[index].type === 'square_empty'"
               :class="bindClass(list[index].type)">
            <!-- <div v-if="list[index].status === 'ice'">
              冰块状态
            </div> -->
            <div @click="selectEndPoint(index, list[index].position)"
                 :class="{'endPointActive': endPointActiveIndex === index}"
                 :ref="'ice_end_' + index">
              空格子{{index}}
            </div>
          </div>

          <div v-if="list[index].type === 'square_ice'"
               :class="bindClass(list[index].type)">
            <div @click="backIceSquare(index)"
                 :ref="'ice_back_' + index"
                 class="reset">
              返回
            </div>
            <!-- v-if="list[index].status === 'reset'" -->
            <div @click="selectStartPoint(index, list[index].position, list[index].status)"
                 class="ice"
                 :class="{'startPointActive': startPointActiveIndex === index}"
                 :ref="'ice_start_' + index">
              冰块起点{{index}}
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>


<script>
import mixin from "./mixin"
export default {
  mixins: [mixin],
  data () {
    return {

      startInfo: null,
    }
  },
  computed: {
    bindClass () {
      return function (type) {
        if (type === "square_empty") {
          return {
            "square_empty": true
          }
        }
        if (type === "square_ice") {
          return {
            "square_ice": true
          }
        }


      }
    },
    setPos () {
      return function ({ x, y }) {
        return {
          left: `${(x - 1) * 50}px`,
          top: `${y * 50}px`,
        }
      }
    },
    setGameBoxHeight () {
      return function (w, h) {
        return {
          width: `${w * 50}px`,
          height: `${h * 50}px`,
        }
      }
    }
  },
  methods: {
    // 初始化list
    initList () {
      // this.list = this.list.map(d => {
      //   if (d.type === "square_empty") {
      //     return {
      //       ...d,

      //     }
      //   }

      // })
    },
    isMove (endInfo) {
      const { position: { x, y } } = this.startInfo;
      console.log(x, y, endInfo)
      if (endInfo.position.x !== x && endInfo.position.y !== y) {
        console.log("不能移动")
        return;
      }
    },
    choosesquare_ice (event, info) {
      console.log("info", info);
      console.log("startInfo", this.startInfo)
      if (!this.startInfo) {
        if (info.type === "square_empty") return
        if (info.type === "square_ice") {
          event.target.classList.add("square_iceActive");
          this.startInfo = info;
        }
      }
      // 保证必须是选选中冰块
      if (this.startInfo) {
        if (info.type === "reset") {
          // 返回
        }
        if (info.type === "square_empty") {
          console.log("dasda")
          // 判断是否可以移动
          event.target.classList.add("square_iceActive");
          this.isMove(info)
        }
      }
      // if (info.type === "square_empty" && !this.startInfo) return

      // if (info.type === "square_ice") {
      //   // event.target.classList.add("square_iceActive");
      //   if (!this.startInfo) {

      //   }
      // }
      // let currDOM =  event.
      // console.log("event", event.target)
      // console.log("this.startInfo ", this.startInfo)

    },
    dragstart (e) {
      console.log("dragstart", e)
    },
    touchMove () {
      //  console.log("touchMove", e)
    },
    touchEnd (e) {
      console.log("touchEnd", e)
    }
  },

}
</script>

<style lang="less">
p,
div,
span {
  user-select: none;
}
.red {
  width: 100px;
  height: 100px;
  background: red;
}
.green {
  width: 100px;
  height: 100px;
  background: green;
  margin-top: 20px;
  margin-bottom: 20px;
}
.yellow {
  width: 100px;
  height: 100px;
  background: yellow;
  // margin-top: 20px;
  // margin-bottom: 20px;
}
.container {
  height: 750px;
  width: 1000px;
  border: 1px solid red;
  .game-container {
    height: 100%;
    width: 100%;
    background: green;
    display: flex;
    align-items: center;
    justify-content: center;
    .game-box {
      background: #a78e44;
      position: relative;
      .item {
        width: 50px;
        height: 50px;
        height: 50px;
        background: red;
        position: absolute;
      }
      .square_empty {
        background-color: #161823;
        width: 100%;
        height: 100%;
        div {
          width: 100%;
          height: 100%;
          position: absolute;
        }
      }
      .square_ice {
        width: 100%;
        height: 100%;
        div {
          width: 100%;
          height: 100%;
          box-sizing: content-box;
        }
        .ice {
          position: absolute;
          background-color: #e3f9fd;
          left: 0;
          transition: all 1s ease;
          top: 0;
          z-index: 2;
          -moz-transition: all 1s ease; /* Firefox 4 */
          -webkit-transition: all 1s ease; /* Safari 和 Chrome */
          -o-transition: all 1s ease; /* Opera */
        }
        .reset {
          background: pink;
        }
      }
      .startPointActive {
        box-sizing: content-box;
        border: 1px solid red;
      }
      .endPointActive {
        box-sizing: content-box;
        border: 1px solid green;
      }
    }
  }
}
</style>