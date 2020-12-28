
import config from "./config";
const TYPE = "three";
export default {

  data () {
    return {
      historyList: [],
      startPointActiveIndex: null,
      endPointActiveIndex: null,
      startPointInfo: null,
      endPointInfo: null,
      isMoving: false, // 是否在移动
      list: config[TYPE].list,
      rowCol: config[TYPE].rowCol,
      isBacking: false, // 是否在回退
      touchInfo: {},
      moveDirection: null,
    }
  },

  methods: {
    // 存储历史记录
    pushHistoryList (history) {
      this.historyList.push(history);
    },
    // 返回按钮将冰块重置
    backIceSquare (domIndex) {
      if (!this.historyList.length) return;
      if (this.isBacking || this.isMoving) return;
      const lastHistory = this.historyList[this.historyList.length - 1];
      // 只能逐步返回
      if (lastHistory.startIndex !== domIndex) return;
      if (lastHistory.startIndex === domIndex) {
        this.isBacking = true;
        // 把最后一条记录删掉
        this.backMove(domIndex, lastHistory);
        this.historyList = this.historyList.slice(0, this.historyList.length - 1);
        // DOM复位才能做其他事
        setTimeout(() => {
          this.isBacking = false;
        }, 1200)
      }
    },
    // 冰块重置移动算法
    backMove (domIndex, lastHistory) {
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
        Object.assign(
          {},
          { ...this.list[startIndex] },
          { status: "" }
        )
      )
      // 空格格子状态恢复
      this.$set(
        this.list,
        endIndex,
        Object.assign(
          {},
          { ...this.list[endIndex] },
          { status: "" }
        )
      )
    },

    mylog () {
      console.log("this.historyList", this.historyList)
      // console.log("this.startPointInfo", this.startPointInfo)
      console.log("-----");
      // console.log("this.endPointInfo", this.endPointInfo)
      console.log("-----");
      console.log("this.list", this.list)
    },

    // 判断游戏是否结束
    isWinGame () {
      // 所有square_empty的格子status都为ice为游戏胜利条件
      let isWin = this.list.filter(d => d.type === "square_empty").every(d => d.status === "ice");
      if (isWin) {
        alert("You Win")
      } else {
        console.log("游戏没结束")
      }
    },
    move(gap) {
      console.log("======move======", gap)
      if (!gap || this.isMoving) return;
      this.isMoving = true;
      const { start } = this.touchInfo;
      let ref, dom;
      ref = `ice_start_${start.index}`;
      dom = this.$refs[ref][0];
      dom.style.zIndex = 99;
      if (this.moveDirection === "x") {
       dom.style.left = `${gap * 50}px`;
      }
      if (this.moveDirection === "y") {
        dom.style.top = `${gap * 50}px`;
      }
      this.touchInfo = {}
      this.moveDirection = null;
      this.isMoving = false;
      // dom.style[direction === "x" ? "left" : direction === "y" ? "top" : ""] = `${50 * gap}px`;
    },
    // 判断是否可以移动
    judgeMove(directionNum, eleIndex, position) {
      let GAP = 0; 
      // let currDOMIndex = eleIndex;
      // 1左 2右 3下 4上
      if (directionNum === 1 || directionNum === 2) {
        // x方向
        console.log("eleIndex", eleIndex)
        let filterDir = "y";
        // const crossArr = this.list.slice(eleIndex, )
        // 该冰块只能移动的数组
        let crossArr = this.list.filter(d => (d.position[filterDir] === position[filterDir]));
        // 当前DOM在数组中的索引
        let currDOMIndex = crossArr.findIndex(d => d.position.x ===  position.x && d.position.y === position.y);
        //  根据方向截取可移动数组
        let sliceArr;
        if (directionNum === 1) {
          sliceArr = crossArr.slice(currDOMIndex, crossArr.length);
        }
        if (directionNum === 2) {
          sliceArr = crossArr.slice(0, currDOMIndex);
        }
        const LENGTH = sliceArr.length;
        // 左
        if (directionNum === 1) {
          while (currDOMIndex < LENGTH) {
            let next = sliceArr[currDOMIndex + 1];
            if (next) {
              if (next.position[filterDir] === position[filterDir]) {
                // 下一个格子空格
                if (next.type === "square_empty" && !next.status) {
                  console.log("in")
                  GAP = GAP + 1;
                  this.move(GAP);
                  break;
                }
                // 下一个格子空格且是是冰块状态
                if (next.type === "square_empty" && next.status === "ice") {
                  currDOMIndex++;
                }
              } else {
                break;
              }
            }
          }
        }
        // 右
        if (directionNum === 2) {
          while (currDOMIndex < LENGTH) {
            let prev = sliceArr[currDOMIndex - 1];
            if (prev) {
              if (prev.position[filterDir] === position[filterDir]) {
                // 下一个格子空格
                if (prev.type === "square_empty" && !prev.status) {
                  console.log("DDD")
                  GAP = GAP - 1;
                  this.move(GAP);
                  break;
                }
                // 下一个格子空格且是是冰块状态
                if (prev.type === "square_empty" && prev.status === "ice") {
                  currDOMIndex--;
                }
              } else {
                break;
              }
            }
          }
        }
  
      }
      console.log("directionNum", directionNum)
      // if (directionNum === 3 || directionNum === 4) {
      //   // 上
      //   let filterDir = "x";
      //   if (directionNum === 4) {
      //     while (currDOMIndex < LENGTH) { 
      //       let prev = this.list[currDOMIndex - 1];
      //       console.log("prev", prev)
      //       if (prev) {
      //         if (prev.position[filterDir] === position[filterDir]) {
      //           // 上一个格子空格
      //           if (prev.type === "square_empty" && !prev.status) {
      //             GAP = GAP - 1;
      //             console.log("in")
      //             this.move(GAP);
      //             break;
      //           }
      //           // 下一个格子空格且是是冰块状态
      //           if (prev.type === "square_empty" && prev.status === "ice") {
      //             currDOMIndex--;
      //           }
      //         } else {
      //           break;
      //         }
      //       }
      //     }
      //   }
      // }
    },
    iceTouchStart(e, index, position) {
      // console.log("")
      if (this.isMoving || this.moveDirection) return;
      console.log("iceTouchStart");
      let event = e || window.event;
      this.touchInfo =  {
        start: {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY,
          index,
          position
        }
      }
      // console.log("start-------e", e.touches)
    },
    iceTouchMove(e) {
      if (this.moveDirection || this.isMoving || !this.touchInfo.start) return;
      console.log("iceTouchMove------before",this.touchInfo);
      let event = e || window.event;
      this.touchInfo =  Object.assign({}, this.touchInfo, {
        end: {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY
        }
      });
      console.log("this.touchInfo---iceTouchMove", this.touchInfo)
      let direction = this.getSilideDirection();
      if (direction) {
        if (direction === 1 || direction === 2) {
          this.moveDirection = "x"
        }
        if (direction === 3 || direction === 4) {
          this.moveDirection = "y";
        }
        const { start } = this.touchInfo;
        this.judgeMove(direction, start.index, start.position);
      }

      // console.log("-----direction-------", direction)
    },
    getSilideDirection() {
      console.log("this.touchInfo", this.touchInfo)
      const { start, end } = this.touchInfo;
      // console.log('---start----', start, '-----end----', end)
      let dx = end.x - start.x;
      let dy = end.y - start.y;
      // if (Math.abs(dx) < 1 || Math.abs(dy) < 1) {
       // console.log("滑动距离太小")
      //   return;
      // }
      // 判断滑动方向
      // 向右
      if (Math.abs(dx) > Math.abs(dy) && dx > 0) {
        console.log("=======right=====")
        return 1;
      }
      // 左
      if (Math.abs(dx) > Math.abs(dy) && dx < 0) {
        console.log("=======left=====")
        return 2;
      }
      // 下
      if (Math.abs(dy) > Math.abs(dx) && dy > 0) {
        console.log("=======down=====")
        return 3;
      }
      // 上
      if ( Math.abs(dy) > Math.abs(dx) && dy < 0) {
        console.log("=======up=====")
        return 4;
      }

    },

    // 清除信息
    clearSelectInfo () {
      this.startPointActiveIndex = null;
      this.startPointInfo = null;
      this.endPointActiveIndex = null;
      this.endPointInfo = null;
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
    // 计算方块位置
    setPos () {
      return function ({ x, y }) {
        return {
          left: `${(x - 1) * 50}px`,
          top: `${y * 50}px`,
        }
      }
    },
    // 游戏盒子的大小
    setGameBoxHeight () {
      return function (w, h) {
        return {
          width: `${w * 50}px`,
          height: `${h * 50}px`,
        }
      }
    }
  }
}