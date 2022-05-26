<template>
  <div>
    <h2>App 父组件</h2>
    <hr />
    <h3>心态:{{ msg }}</h3>

    <button size="mini" @click="msg += '~~~'">update</button>
    <hr />
    <ChildSetup :msg="msg" :msg2="msg2" @xxx="xxx" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
//  引入子组件
import ChildSetup from "./components/ChildSetup.vue"

export default defineComponent({
  name: "App",

  //  注册组件
  components: {
    ChildSetup,
  },

  setup() {
    const msg = ref("take your time!")
    console.log(msg)
    const msg2 = ref("take your time! all is well in the next time ")

    function xxx(txt: string) {
      msg.value += txt
    }
    //  return 这里再return里放的是属性和方法
    return {
      msg,
      msg2,
      xxx,
    }
  },
})
</script>
<style></style>
