<template>
  <div>
    <h2>ChildS 自己组件</h2>
    <h3>msg:{{ msg }}</h3>
    <button @click="update">更新数据</button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue"
export default defineComponent({
  name: "ChildS",

  //  vue2.X 中的生命周期
  beforeCreate() {
    console.log(" vue2.X 中的beforeCreated")
  },
  created() {
    console.log("vue2.X 中 的 created")
  },
  beforeMount() {
    console.log("vue2.X 中 的beforeMount")
  },
  mounted() {
    console.log("vue2.X 中 mounted")
  },
  beforeUpdate() {
    console.log("vue2.X 中beforeUpdate ")
  },
  updated() {
    console.log("vue2.X 中updated ")
  },
  //  vue2.x 中的beforeDestroyed 和 destroyed  该成beforeUnmount 和unmounted
  beforeUnmount() {
    console.log("vue2.X 中 beforeDestroy")
  },
  unmounted() {
    console.log("vue2.X 中destroyed ")
  },

  setup() {
    console.log("vue 3.0 中的 setup")

    //  按钮带年纪事件的回调
    const msg = ref("abc")
    const update = () => {
      msg.value += "++"
    }
    // onBeforeMount(){
    //   console.log('');
    // }
    onBeforeMount(() => {
      console.log("3.0 中的 onBeforeMount")
    }),
      onMounted(() => {
        console.log("3.0 中的 onMounted")
      }),
      onBeforeUpdate(() => {
        console.log("3.0 中的 onBeforeUpdate")
      }),
      onUpdated(() => {
        console.log("3.0 中的 onUpdated ")
      }),
      onBeforeMount(() => {
        console.log("3.0 中的 onBeforeMount")
      }),
      onMounted(() => {
        console.log("3.0 中的 onMounted")
      })

    return {
      msg,
      update,
    }
  },
})
</script>
