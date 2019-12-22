<!--  -->
<template>
  <div class="select-list" :class="size">
    <div class="select" :class="showList?'select-active':''" @click="pullList">
      <div class="title">{{currentName}}</div>
      <div class="arrow">
        <img class="arrow-img transion" :class="showList?'rotate-90':''" src alt />
      </div>
    </div>
    <div class="list transion" :class="showList?'pulldown':''">
      <div
        class="list-item"
        v-for="obj in options"
        :key="obj.id"
        @click="actionItem(obj)"
      >{{obj.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: [{ name: "zf", id: 1 }]
    },
    selectVal: {
      type: Object,
      default: { name: "请选择", id: 0 }
    }
  },
  data() {
    return {
      showList: false,
      currentVal: JSON.parse(JSON.stringify(this.selectVal))
    };
  },
  computed: {
    currentName() {
      return this.currentVal.name;
    }
  },
  mounted() {
    // 定义全局点击函数
    // Vue.prototype.globalClick = function(callback) {
    //   document.getElementById("main").onclick = function() {
    //     callback();
    //   };
    // };
    // this.globalClick(this.moreSetupMenuRemove);
  },
  methods: {
    pullList() {
      this.showList = !this.showList;
    },
    actionItem(obj) {
      this.showList = !this.showList;
      this.currentVal = JSON.parse(JSON.stringify(obj));
      this.$emit("change", this.currentVal);
    }
  }
};
</script>
<style scoped>
.select-list {
  width: 100%;
  position: relative;
}
.list {
  background-color: white;
  border-radius: 5px;
  position: absolute;
  width: 100%;
  overflow: scroll;
  padding: 10px 0px;
  max-height: 0px;
  opacity: 0;
}
.list-item {
  box-sizing: border-box;
  padding: 0px 10px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  text-align: left;
}
.list-item:hover {
  background-color: #dcdee2;
}
.select {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  border: 1px solid #dcdee2;
  border-radius: 5px;
  line-height: 30px;
  height: 30px;
  font-size: 16px;
  padding: 0px 10px;
  color: #808695;
  /* box-shadow: 0 0 0 2px rgba(45,140,240,.2); */
  background-color: white;
}
.select-active {
  border: 1px solid #57a3f3;
}
.title {
  text-align: left;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
}
.arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  background-color: pink;
}
.arrow-img {
  width: 25px;
  height: 25px;
  background-color: aquamarine;
}

.transion {
  transition: all 0.3s ease-in 0s;
}
.rotate-90 {
  transform: rotate(45deg);
}
.pulldown {
  opacity: 1;
  max-height: 150px;
}
</style>
