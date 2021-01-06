import config from "./config";
import { ICEHistory } from "./History";
import { cloneDeep } from "../../utils/utils";
const TYPE = "six";
export default {
  data() {
    return {
      iceHistory: new ICEHistory(),
      isMoving: false, // 是否在移动
      list: cloneDeep(config[TYPE].list),
      rowCol: config[TYPE].rowCol,
      isBacking: false, // 是否在回退
      touchInfo: {},
      moveDirection: null,
      timeCount: 0, // 计时器
      hackReset: true
    };
  },

  mounted() {
    this.interval = setInterval(() => {
      this.timeCount += 1;
    }, 1000);
  },

  methods: {
    // 设置list变化属性
    setListStatus(index, status) {
      this.$set(
        this.list,
        index,
        Object.assign({}, this.list[index], {
          status: status
        })
      );
    },
    // 重新开始游戏
    reStartGame() {
      this.iceHistory.empty();
      this.hackReset = false; //销毁组件
      this.$nextTick(() => {
        this.isMoving = false;
        this.touchInfo = {};
        this.isBacking = false;
        this.moveDirection = null;
        this.list = cloneDeep(config[TYPE].list);
        this.hackReset = true; //重建组件
      });
    },
    // 存储历史记录
    pushHistoryList(history) {
      if (this.iceHistory.getLength() > 0) {
        const lastHistory = this.iceHistory.getLast();
        this.setListStatus(lastHistory.startIndex, "moved");
      }
      this.iceHistory.push(history);
    },
    // 返回按钮将冰块重置
    backIceSquare(domIndex) {
      if (!this.iceHistory.getLength()) return;
      if (this.isBacking || this.isMoving) return;
      let lastHistory = this.iceHistory.getLast();
      // 只能逐步返回
      if (lastHistory.startIndex !== domIndex) return;
      if (lastHistory.startIndex === domIndex) {
        this.isBacking = true;
        // 把最后一条记录删掉
        this.backMove(domIndex, lastHistory);
        this.iceHistory.delLast();
        // DOM复位才能做其他事
        setTimeout(() => {
          // 将最近一条记录返回按钮复位
          if (this.iceHistory.getLength() > 0) {
            lastHistory = this.iceHistory.getLast();
            this.setListStatus(lastHistory.startIndex, "reset");
          }
          this.isBacking = false;
        }, 1200);
      }
    },
    // 冰块重置移动算法
    backMove(domIndex, lastHistory) {
      const { direction, endIndex, startIndex } = lastHistory;
      let ref = `ice_start_${domIndex}`;
      let dom = this.$refs[ref][0];
      if (direction === "x") {
        dom.style.left = "50%";
      }
      if (direction === "y") {
        dom.style.top = "43%";
      }
      dom.style.zIndex = 100;
      // 冰块 moved状态取消
      this.setListStatus(startIndex, "");
      // 空格格子状态恢复
      this.setListStatus(endIndex, "");
    },

    // 判断游戏是否结束
    isWinGame() {
      // 所有square_empty的格子status都为ice为游戏胜利条件
      let isWin = this.list
        .filter((d) => d.type === "square_empty")
        .every((d) => d.status === "ice");
      if (isWin) {
        alert("You Win");
      } else {
        console.error("游戏没结束");
      }
    },

    // 改变list状态
    changeListStatus(startIndex, endIndex) {
      // 冰块变为返回
      this.setListStatus(startIndex, "reset");
      // 空格子变为冰块
      this.setListStatus(endIndex, "ice");
      this.pushHistoryList({
        startIndex: startIndex,
        direction: this.moveDirection,
        endIndex: endIndex
      });
    },

    getMoveDistance(domIndex, gap, direction) {
      let dis = this.$refs[`ice_start_${domIndex}`][0][
        direction === "x" ? "offsetLeft" : "offsetTop"
      ];
      return 104 * gap + dis;
    },
    move(gap, endIndex) {
      if (!gap || this.isMoving) return;
      this.isMoving = true;
      const { start } = this.touchInfo;
      let ref, dom;
      ref = `ice_start_${start.index}`;
      dom = this.$refs[ref][0];
      dom.style.zIndex = 66;
      dom.style[
        this.moveDirection === "x"
          ? "left"
          : this.moveDirection === "y"
          ? "top"
          : ""
      ] = `${this.getMoveDistance(start.index, gap, this.moveDirection)}px`;
      setTimeout(() => {
        this.changeListStatus(start.index, endIndex);
        dom.style.zIndex = 2;
        dom = null;
        this.touchInfo = {};
        this.moveDirection = null;
        this.isMoving = false;
        this.isWinGame();
      }, 1200);
    },
    // 找出要移动元素在list里的index
    findIndexWithArr(list, x, y) {
      return list.findIndex((d) => d.position.x === x && d.position.y === y);
    },

    // 判断是否可以移动
    judgeMove(directionNum) {
      const {
        start: { position }
      } = this.touchInfo;
      let GAP = 0;
      // 1左 2右 3下 4上
      let filterDir, crossArr, startIndexInCross, allowdMoveArr;
      if (directionNum === 1 || directionNum === 3) {
        // 左或下的时候 右边的数据索引一定大于左边
        filterDir = directionNum === 1 ? "y" : "x";
        // 该冰块只能移动的数组
        crossArr = this.list.filter(
          (d) => d.position[filterDir] === position[filterDir]
        );
        startIndexInCross = this.findIndexWithArr(
          crossArr,
          position.x,
          position.y
        );
        allowdMoveArr = crossArr.slice(startIndexInCross, crossArr.length);
      }
      if (directionNum === 2 || directionNum === 4) {
        // 右或上的时候 只需截取0到start-1数据索即可
        filterDir = directionNum === 2 ? "y" : "x";
        crossArr = this.list.filter(
          (d) => d.position[filterDir] === position[filterDir]
        );
        startIndexInCross = this.findIndexWithArr(
          crossArr,
          position.x,
          position.y
        );
        allowdMoveArr = crossArr.slice(0, startIndexInCross);
      }
      let LENGTH = allowdMoveArr.length;
      // 左 下
      if (directionNum === 1 || directionNum === 3) {
        while (startIndexInCross < LENGTH) {
          let next = allowdMoveArr[startIndexInCross + 1];
          if (next) {
            if (next.position[filterDir] === position[filterDir]) {
              // 下一个格子空格
              if (next.type === "square_empty" && !next.status) {
                GAP = GAP + 1;
                let endIndex = this.findIndexWithArr(
                  this.list,
                  next.position.x,
                  next.position.y
                );
                this.move(GAP, endIndex);
                break;
              }
              // 下一个格子空格且是是冰块状态
              if (next.type === "square_empty" && next.status === "ice") {
                GAP = GAP + 1;
                startIndexInCross++;
              }
            } else {
              break;
            }
          }
        }
      }
      // 右, 上
      if (directionNum === 2 || directionNum === 4) {
        let filterDir = directionNum === 2 ? "y" : "x";
        while (0 <= startIndexInCross) {
          let prev = allowdMoveArr[startIndexInCross - 1];
          if (prev) {
            if (prev.position[filterDir] === position[filterDir]) {
              // 上一个格子空格
              if (prev.type === "square_empty" && !prev.status) {
                GAP = GAP - 1;
                let endIndex = this.findIndexWithArr(
                  this.list,
                  prev.position.x,
                  prev.position.y
                );
                this.move(GAP, endIndex);
                break;
              }
              // 上一个格子空格且是是冰块状态
              if (prev.type === "square_empty" && prev.status === "ice") {
                GAP = GAP - 1;
                startIndexInCross--;
              }
            } else {
              break;
            }
          }
        }
      }
    },
    iceTouchStart(e, index, position, status) {
      if (this.isMoving || this.moveDirection) return;
      if (status === "moved" || status === "reset") return;
      let event = e || window.event;
      this.touchInfo = {
        start: {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY,
          index,
          position
        }
      };
    },
    iceTouchMove(e) {
      if (this.moveDirection || this.isMoving) return;
      if (!this.touchInfo.start) return;
      if (status === "moved" || status === "reset") return;
      let event = e || window.event;
      this.touchInfo = Object.assign({}, this.touchInfo, {
        end: {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY
        }
      });
      let direction = this.getSilideDirection();
      if (direction) {
        if (direction === 1 || direction === 2) {
          this.moveDirection = "x";
        }
        if (direction === 3 || direction === 4) {
          this.moveDirection = "y";
        }
        this.judgeMove(direction);
      }
    },
    getSilideDirection() {
      const { start, end } = this.touchInfo;
      let dx = end.x - start.x;
      let dy = end.y - start.y;
      // 向右
      if (Math.abs(dx) > Math.abs(dy) && dx > 0) {
        console.log("=======right=====");
        return 1;
      }
      // 左
      if (Math.abs(dx) > Math.abs(dy) && dx < 0) {
        console.log("=======left=====");
        return 2;
      }
      // 下
      if (Math.abs(dy) > Math.abs(dx) && dy > 0) {
        console.log("=======down=====");
        return 3;
      }
      // 上
      if (Math.abs(dy) > Math.abs(dx) && dy < 0) {
        console.log("=======up=====");
        return 4;
      }
    }
  },
  computed: {
    bindClass() {
      return function(type) {
        if (type === "square_empty") {
          return {
            "square-empty-wrap": true
          };
        }
        if (type === "square_ice") {
          return {
            "square-ice-wrap": true
          };
        }
      };
    },
    // 计算方块位置
    setPos() {
      return function({ x, y }) {
        return {
          left: `${(x - 1) * 104}px`,
          top: `${y * 104}px`
        };
      };
    },
    // 游戏盒子的大小
    setGameBoxHeight() {
      return function(w, h) {
        return {
          width: `${w * 104}px`,
          height: `${h * 104}px`
        };
      };
    }
  },
  filters: {
    formatTime(timer) {
      let m = parseInt(timer / 60);
      let s = timer - m * 60;
      m = m > 9 ? m : "0" + m;
      s = s > 9 ? s : "0" + s;
      return m + ":" + s;
    }
  }
};
