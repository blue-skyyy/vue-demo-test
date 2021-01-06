<template>
  <div class="container">
    <div class="puzzle-game-container">
      <!-- 头部区域 -->
      <div class="puzzle-game-header">
        <div class="puzzle-game-header-title">
          滑冰块
        </div>
        <div class="puzzle-game-header-timer">
          {{ timeCount | formatTime }}
        </div>
      </div>
      <!-- 右侧两个div按钮 -->
      <div class="puzzle-game-right">
        <div class="puzzle-game-right-reset" @click.stop="reStartGame"></div>
      </div>
      <div class="puzzle-game-box">
        <div
          class="puzzle-game-box-content"
          v-if="hackReset"
          :style="setGameBoxHeight(rowCol.col, rowCol.row)"
        >
          <div
            class="puzzle-game-box-content-item"
            :style="setPos(list[index].position)"
            v-for="(d, index) in Array(list.length)"
            :key="index"
          >
            <div
              v-if="list[index].type === 'square_empty'"
              :class="bindClass(list[index].type)"
            >
              <div
                class="square-empty-default"
                @click.stop="selectEndPoint(index, list[index].position)"
                :class="{ endPointActive: endPointActiveIndex === index }"
                :ref="'ice_end_' + index"
              ></div>
            </div>

            <div
              v-if="list[index].type === 'square_ice'"
              :class="bindClass(list[index].type)"
            >
              <div class="square-ice-wrap-default">
                <div
                  class="square-ice-wrap-default-ice"
                  @click.stop="
                    selectStartPoint(
                      index,
                      list[index].position,
                      list[index].status
                    )
                  "
                  :class="{ startPointActive: startPointActiveIndex === index }"
                  :ref="'ice_start_' + index"
                ></div>
                <div
                  class="square-ice-wrap-default-reset"
                  :ref="'ice_back_' + index"
                >
                  <div
                    @click.stop="backIceSquare(index)"
                    v-if="list[index].status === 'reset'"
                  >
                    <img
                      src="http://chuantu.xyz/t6/741/1609843678x1700339730.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "./mixin";
export default {
  mixins: [mixin],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less">
p,
div,
span {
  user-select: none;
}
.container {
  height: 750px;
  width: 1334px;
  .puzzle-game-container {
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    position: relative;
    .puzzle-game-header {
      overflow: hidden;
      display: flex;
      justify-content: center;
      text-align: center;
      .puzzle-game-header-title,
      .puzzle-game-header-timer {
        box-sizing: border-box;
        height: 68px;
        border-radius: 0 0 44px 44px;
        display: inline-block;
        font-size: 36px;
        color: #fff;
        height: 68px;
        background: #546be7;
        border-radius: 0px 0px 44px 44px;
        box-shadow: 0px -8px 0px 0px #354ed5 inset;
      }
      .puzzle-game-header-title {
        width: 257px;
      }
      .puzzle-game-header-timer {
        margin-left: 3px;
        width: 157px;
      }
    }
    .puzzle-game-right {
      .puzzle-game-right-reset {
        width: 72px;
        height: 72px;
        background-image: url("http://chuantu.xyz/t6/741/1609916231x1700340463.png");
        background-repeat: no-repeat;
        background-position: center center;
        border-radius: 50%;
        box-sizing: border-box;
        position: absolute;
        right: 18px;
        top: 105px;
      }
    }
    .puzzle-game-box {
      width: 580px;
      height: 580px;
      background: #00a5ff;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 16px solid #fff;
      position: relative;
      top: 25px;
      left: 45%;
      &::after {
        content: "";
        width: 556px;
        height: 556px;
        position: absolute;
        background: #00bfff;
        border-radius: 30px;
      }
      .puzzle-game-box-content {
        z-index: 2;
        background: transparent;
        position: relative;
        .puzzle-game-box-content-item {
          width: 104px;
          height: 104px;
          position: absolute;
          background-color: #1467c5;
          border: 2px solid rgba(103, 201, 255, 0.16);
          box-sizing: border-box;
        }
        .square-empty-wrap {
          background-color: #1467c5;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .square-empty-default {
            width: 64px;
            height: 70px;
            background: #0f4889;
            border-radius: 8px;
            box-shadow: 0px 10px 0px 0px #183755 inset;
          }
        }
        .square-ice-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .square-ice-wrap-default {
            width: 84px;
            height: 84px;
            background: #00bfff;
            border-radius: 8px;
            box-shadow: 0px -4px 0px 0px #00a9fe inset;
            // display: flex;
            // align-items: flex-start;
            // justify-content: center;
            position: relative;
            // top: -1px;
            .square-ice-wrap-default-ice {
              width: 59px;
              height: 55px;
              background: #c6f1ff;
              border-radius: 8px;
              box-shadow: 0px 8px 0px 0px #72d8ff;
              transform: translate(-50%, -50%);
              // margin-bottom: 10px;
              top: 43%;
              left: 50%;
              position: absolute;
              transition: all 1s ease;
              z-index: 22;
              -moz-transition: all 1s ease; /* Firefox 4 */
              -webkit-transition: all 1s ease; /* Safari 和 Chrome */
              -o-transition: all 1s ease; /* Opera */
            }
            .square-ice-wrap-default-reset {
              background: #00a7ff;
              border-radius: 8px;
              box-shadow: 0px 10px 0px 0px #0097ff inset;
              width: 60px;
              height: 65px;
              transform: translate(-50%, -50%);
              position: absolute;
              top: 50%;
              left: 50%;
            }
          }
          // div {
          //   width: 100%;
          //   height: 100%;
          //   box-sizing: content-box;
          // }
          // .square-ice-default {
          //   position: absolute;
          //   left: 0;
          //   transition: all 1s ease;
          //   top: 0;
          //   z-index: 2;
          //   -moz-transition: all 1s ease; /* Firefox 4 */
          //   -webkit-transition: all 1s ease; /* Safari 和 Chrome */
          //   -o-transition: all 1s ease; /* Opera */
          // }
          // .reset {
          //   // background: pink;
          // }
        }
        // .startPointActive {
        //   box-sizing: content-box;
        //   border: 1px solid red;
        // }
        // .endPointActive {
        //   box-sizing: content-box;
        //   border: 1px solid green;
        // }
      }
    }
  }
}
</style>
