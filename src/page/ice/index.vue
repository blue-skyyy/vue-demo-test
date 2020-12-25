<template>
    <div class="container">
      <div>
        <div v-for="(d, index) in list" :key="index" class="row">
          <div v-for="(dd, ddindex) in d" :key="ddindex">

            <template v-if="dd">
               <div v-if="dd && dd.type === 'empty'" class="empty" :style="setPos(dd.position)">empty</div>
              <div v-if="dd && dd.type === 'ice'" class="ice"  :style="setPos(dd.position)">ice</div>
            </template>
          </div>
      
        </div>
      </div>
    </div>

</template>


<script>
export default {
  data() {
    return {
      list: [
        [null, null, null, {type: "empty", position: {x:4, y: 1}}],
        [{type: 'ice', position: {x:1, y:2}}, null, null, null, {type:'ice', position: {x:5, y: 2}}],
        [{type: 'ice', position: {x:2, y:3}}, null, null, {type: 'ice', position: {x:4, y:3}}]
      ]
    }
  },
  computed: {
    setPos() {
      return function({x,y}) {
        return {
          left: `${x*50}px`,
          top:`${(y)*50}px`
        }

      }
    }
  },
  methods: {
    clickMove() {

    },
    dragstart(e) {
      console.log("dragstart", e)
    },
    touchMove() {
  //  console.log("touchMove", e)
    },
    touchEnd(e) {
   console.log("touchEnd", e)
    }
  },
  
}
</script>

<style lang="less">
.container {
  height: 100%;
  width: 100%;
  // overflow: hidden;
  border: 1px solid red;
}
.row {
  position: absolute;
  background: pink;
  // overflow: hidden;
}
.ice, .empty {
  width: 50px;
  height: 50px;
  background: red;
  position: absolute;
  display: inline-block;
}
</style>