<template>
  <div>
    <h2>计算属性与监视</h2>
    <fieldset>
      <legend>姓名操作</legend>
      姓氏：<input type="text" placeholder="请输入姓氏" v-model="user.firstName" /><br />
      名字：<input type="text" placeholder="请输入名字" v-model="user.lastName" />
    </fieldset>
    <fieldset>
      <legend>计算属性与监视的演示</legend>
      姓名：<input type="text" placeholder="显示姓名" v-model="fullName1" /><br />
      姓名：<input type="text" placeholder="请输入姓氏" v-model="fullName2" /><br />
      姓名：<input type="text" placeholder="请输入姓氏" v-model="fullName3" /><br />
    </fieldset>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect, watch } from "vue"

export default defineComponent({
  name: "App",

  setup() {
    //  定义一个响应式的对象
    const user = reactive({
      // 姓氏
      firstName: "阿斯耶",
      //名字
      lastName: "艾力",
    })
    //  通过计算属性的方式，实现第一个姓名的显示
    // vue3 中的计算属性

    //  第一个姓名:
    //  返回的是一个ref类型的对象
    const fullName1 = computed(() => {
      return user.firstName + "·" + user.lastName
    })

    //  第二个姓名：
    const fullName2 = computed({
      get() {
        return user.firstName + "·" + user.lastName
      },
      set(val: string) {
        // console.log(val)
        const names = val.split("==")
        user.firstName = names[0]
        user.lastName = names[1]
      },
    })

    //   第三个姓名：
    const fullName3 = ref("-")
    //  监视----  监视指定的数据
    //  watch 没用一开始就执行
    watch(
      user,
      ({ firstName, lastName }) => {
        // console.log();
        fullName3.value = firstName + "·" + lastName
      },
      { immediate: true, deep: true } //  immediate 默认一开始会执行一次watch, deep:深度监视
    )

    //  watchEffect 也是监视,  这种监视中不需要配置 immediate ，  它本身就默认会进行监视（执行一次的）
    // watchEffect(() => {
    //   fullName3.value = user.firstName + "·" + user.lastName
    // })

    //  监视fullName3 的数据，改变 firstName 和lastName
    watchEffect(() => {
      const names = fullName3.value.split("·")
      user.firstName = names[0]
      user.lastName = names[1]
    })

    //  watch  --- 可以监视多个数据
    //  这里的代码就没用执行
    // watch([user.firstName, user.lastName], () => {
    //  这里的代码可以执行， 因为fullName3 是响应式的数据， 但是 user.firstName, user.lastName 不是响应式的数据
    // watch([user.firstName, user.lastName, fullName3], () => {
    //   console.log("====")
    // })

    //  当我没使用watch监视非响应式的数据时，代码需要改一下
    watch([() => user.firstName, () => user.lastName, fullName3], () => {
      console.log("----")
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3,
    }
  },
})
</script>
<style></style>
