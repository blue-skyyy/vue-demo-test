import config from "./config";
const TYPE = "five";
export default {
  data() {
    return {
      historyList: [],
      startPointActiveIndex: null,
      endPointActiveIndex: null,
      startPointInfo: null,
      endPointInfo: null,
      isMoving: false, // 是否在移动
      list: config[TYPE].list,
      rowCol: config[TYPE].rowCol,
      isBacking: false // 是否在回退
    };
  },

  methods: {
    // 存储历史记录
    pushHistoryList(history) {
      this.historyList.push(history);
    },
    // 返回按钮将冰块重置
    backIceSquare(domIndex) {
      if (!this.historyList.length) return;
      if (this.isBacking || this.isMoving) return;
      const lastHistory = this.historyList[this.historyList.length - 1];
      // 只能逐步返回
      if (lastHistory.startIndex !== domIndex) return;
      if (lastHistory.startIndex === domIndex) {
        this.isBacking = true;
        // 把最后一条记录删掉
        this.backMove(domIndex, lastHistory);
        this.historyList = this.historyList.slice(
          0,
          this.historyList.length - 1
        );
        // DOM复位才能做其他事
        setTimeout(() => {
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
        dom.style.left = "0px";
      }
      if (direction === "y") {
        dom.style.top = "0px";
      }
      dom.style.zIndex = 100;
      // 冰块 moved状态取消
      this.$set(
        this.list,
        startIndex,
        Object.assign({}, { ...this.list[startIndex] }, { status: "" })
      );
      // 空格格子状态恢复
      this.$set(
        this.list,
        endIndex,
        Object.assign({}, { ...this.list[endIndex] }, { status: "" })
      );
    },

    mylog() {
      console.log("this.historyList", this.historyList);
      // console.log("this.startPointInfo", this.startPointInfo)
      console.log("-----");
      // console.log("this.endPointInfo", this.endPointInfo)
      console.log("-----");
      console.log("this.list", this.list);
    },

    // 选中起点
    selectStartPoint(index, info, status) {
      if (this.isBacking || this.isMoving) return;
      // 已移动不可以再选择
      if (status === "moved") return;
      // 如果已有终点信息清除,保证当前所选起点信息是最新的
      if (this.endPointInfo) {
        this.clearSelectInfo();
      }
      this.startPointActiveIndex = index;
      this.startPointInfo = info;
    },
    // 终点信息
    selectEndPoint(index, info) {
      if (this.isBacking || this.isMoving) return;
      // 必须先选中起点
      if (this.startPointInfo) {
        this.endPointActiveIndex = index;
        this.endPointInfo = info;
        this.judgeMove();
      } else {
        // 否则清空所有状态
        this.clearSelectInfo();
      }
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
        console.log("游戏没结束");
      }
    },
    // 判断冰块是否可以移动
    judgeMove() {
      // 所选起点和终点方块不在x,y方向不可移动
      if (
        this.startPointInfo.x !== this.endPointInfo.x &&
        this.startPointInfo.y !== this.endPointInfo.y
      ) {
        this.clearSelectInfo();
        return;
      }
      let gap, max, min, direction, filterDir;
      if (this.startPointInfo.x === this.endPointInfo.x) {
        // Y方向可以移动
        direction = "y";
        filterDir = "x";
      }
      if (this.startPointInfo.y === this.endPointInfo.y) {
        // X方向可以移动
        direction = "x";
        filterDir = "y";
      }
      gap = this.endPointInfo[direction] - this.startPointInfo[direction];
      if (Math.abs(gap) === 1) {
        // 间隔为1可移动
        this.move(direction);
      } else if (Math.abs(gap) !== 1) {
        // 间隔大于1
        gap > 0
          ? ((max = this.endPointInfo[direction]),
            (min = this.startPointInfo[direction]))
          : ((max = this.startPointInfo[direction]),
            (min = this.endPointInfo[direction]));
        // crossArr为x或y方向 起点、终点间的数组
        const crossArr = this.list.filter(
          (d) =>
            d.position[filterDir] === this.endPointInfo[filterDir] &&
            d.position[direction] > min &&
            d.position[direction] < max
        );
        let isCross = true;
        // 如果数组有一个元素状态不为ice则不能滑动
        for (let i = 0; i < crossArr.length; i++) {
          if (crossArr[i].status !== "ice") {
            isCross = false;
            break;
          }
        }
        if (isCross) {
          this.move(direction);
        } else {
          console.log("不能滑动");
        }
      }
    },
    // 移动冰块
    move(direction) {
      let gap, ref, dom;
      gap = this.endPointInfo[direction] - this.startPointInfo[direction];
      ref = `ice_start_${this.startPointActiveIndex}`;
      dom = this.$refs[ref][0];
      dom.style.zIndex = 3;
      dom.style[
        direction === "x" ? "left" : direction === "y" ? "top" : ""
      ] = `${50 * gap}px`;
      this.isMoving = true;
      // 改变LIST状态
      setTimeout(() => {
        // 冰块变为返回
        this.$set(
          this.list,
          this.startPointActiveIndex,
          Object.assign({}, this.list[this.startPointActiveIndex], {
            status: "moved"
          })
        );
        // 空格子变为冰块
        this.$set(
          this.list,
          this.endPointActiveIndex,
          Object.assign({}, this.list[this.endPointActiveIndex], {
            status: "ice"
          })
        );
        // 历史记录里PUSH一条
        this.pushHistoryList({
          startIndex: this.startPointActiveIndex,
          direction,
          endIndex: this.endPointActiveIndex
        });
        dom.style.zIndex = 2;
        this.isMoving = false;
        this.clearSelectInfo();
        this.isWinGame();
      }, 1200);
    },
    // 清除信息
    clearSelectInfo() {
      this.startPointActiveIndex = null;
      this.startPointInfo = null;
      this.endPointActiveIndex = null;
      this.endPointInfo = null;
    }
  },
  computed: {
    bindClass() {
      return function(type) {
        if (type === "square_empty") {
          return {
            square_empty: true
          };
        }
        if (type === "square_ice") {
          return {
            square_ice: true
          };
        }
      };
    },
    // 计算方块位置
    setPos() {
      return function({ x, y }) {
        return {
          left: `${(x - 1) * 50}px`,
          top: `${y * 50}px`
        };
      };
    },
    // 游戏盒子的大小
    setGameBoxHeight() {
      return function(w, h) {
        return {
          width: `${w * 50}px`,
          height: `${h * 50}px`
        };
      };
    }
  }
};
