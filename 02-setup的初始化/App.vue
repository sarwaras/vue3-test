<template>
  <div>哈哈哈哈 我来学习了！！！</div>
</template>

<script lang="ts">
//defineComponent 函数，目的是定义一个组件，内部传入一个配置对象
import { defineComponent } from "vue"
// import HelloWorld from "./components/HelloWorld.vue"

// 暴露出定义好的组件
export default defineComponent({
  //  当前组件的名称
  name: "App",

  //  测试代码
  setup() {
    const number = 7
    return {
      number,
    }
  },
})
</script>
<style></style>
