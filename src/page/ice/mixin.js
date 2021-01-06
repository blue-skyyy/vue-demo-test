import config from "./config";
import { ICEHistory } from "./History";
import { cloneDeep } from "../../utils/utils";
const TYPE = "six";
export default {
  data() {
    return {
      iceHistory: new ICEHistory(),
      startPointActiveIndex: null,
      endPointActiveIndex: null,
      startPointInfo: null,
      endPointInfo: null,
      isMoving: false, // 是否在移动
      list: cloneDeep(config[TYPE].list),
      rowCol: config[TYPE].rowCol,
      isBacking: false, // 是否在回退
      hackReset: true,
      timeCount: 0 // 计时器
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
      this.hackReset = false; //销毁组件
      this.$nextTick(() => {
        this.clearSelectInfo();
        this.list = cloneDeep(config[TYPE].list);
        this.isMoving = false; // 是否在移动
        this.isBacking = false; // 是否在回退
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
        this.backMove(domIndex, lastHistory);
        // 把最后一条记录删掉
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

    // 选中起点
    selectStartPoint(index, info, status) {
      if (this.isBacking || this.isMoving) return;
      // 已移动不可以再选择
      if (status === "moved" || status === "reset") return;
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
        console.error("游戏没结束");
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
          console.error("不能滑动");
        }
      }
    },

    getMoveDistance(direction) {
      let gap = this.endPointInfo[direction] - this.startPointInfo[direction];
      let dis = this.$refs[`ice_start_${this.startPointActiveIndex}`][0][
        direction === "x" ? "offsetLeft" : "offsetTop"
      ];
      return 104 * gap + dis;
    },
    // 移动冰块
    move(direction) {
      let ref, dom;
      ref = `ice_start_${this.startPointActiveIndex}`;
      dom = this.$refs[ref][0];
      dom.style.zIndex = 66;
      dom.style[
        direction === "x" ? "left" : direction === "y" ? "top" : ""
      ] = `${this.getMoveDistance(direction)}px`;
      this.isMoving = true;
      // 改变LIST状态
      setTimeout(() => {
        // 冰块起变为返回
        this.setListStatus(this.startPointActiveIndex, "reset");
        // 空格子变为冰块
        this.setListStatus(this.endPointActiveIndex, "ice");
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
