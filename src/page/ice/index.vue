<template>
  <div class="container">
    <button @click="mylog">输出</button>
    <div class="game-container">
      <div class="puzzle-game-box">
        <div
          class="puzzle-game-box-content"
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
              <!-- <div v-if="list[index].status === 'ice'">
              冰块状态
            </div> -->
              <div
                class="square-empty-default"
                @click.stop="selectEndPoint(index, list[index].position)"
                :class="{ endPointActive: endPointActiveIndex === index }"
                :ref="'ice_end_' + index"
              >
                空格子{{ index }}凹槽
              </div>
            </div>

            <div
              v-if="list[index].type === 'square_ice'"
              :class="bindClass(list[index].type)"
            >
              <div class="square-ice-wrap-default">
                <div
                  class="square-ice-wrap-default-ice"
                  @click="
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
                  v-if="list[index].status === 'moved'"
                  class="square-ice-wrap-default-reset"
                  @click="backIceSquare(index)"
                  :ref="'ice_back_' + index"
                >
                  <img
                    src="http://chuantu.xyz/t6/741/1609843678x1700339730.png"
                  />
                </div>
              </div>
              <!-- <div class="square-ice-wrap">dsada</div> -->
              <!-- <div
                @click="backIceSquare(index)"
                :ref="'ice_back_' + index"
                class="reset"
              >
                返回
              </div> -->
              <!-- v-if="list[index].status === 'reset'" -->
              <!-- <div
                @click="
                  selectStartPoint(
                    index,
                    list[index].position,
                    list[index].status
                  )
                "
                class="square-ice-default"
                :class="{ startPointActive: startPointActiveIndex === index }"
                :ref="'ice_start_' + index"
              >
                冰块起点{{ index }}
              </div> -->
            </div>

            <!-- 结束 -->
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
  border: 1px solid red;
  .game-container {
    height: 100%;
    width: 100%;
    background: green;
    display: flex;
    align-items: center;
    justify-content: center;
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
}
</style>
