<template>
  <div>
    <h2>reactive 的使用</h2>
    <h3>name:{{ user.name }}</h3>
    <h3>age:{{ user.age }}</h3>
    <h3>friend:{{ user.friend }}</h3>
    <h3>sex:{{ user.gender }}</h3>
    <button @click="updateUser">更新数据</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  name: "App",

  //  需求： 页面打开后直接看到一个数据，点击按钮后，该数据可以发送变化

  /*
  reactive
    作用: 定义多个数据的响应式
    const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
    响应式转换是“深层的”：会影响对象内部所有嵌套的属性
    内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
*/
  setup() {
    // const obj: any = reactive({   // 为了在 obj.gender="男" 的时候不出现这种错误的提示信息才这么书写的
    const obj = reactive({
      name: "angela",
      age: 20,
      friend: {
        name: "tina",
        age: 18,
        cars: ["道奇", "宝马", "奔驰"],
      },
    })

    //  把复杂的数据变成响应式的数据
    // 返回的是一个proxy的代理对象，被代理的目标对象就是obj的对象
    //  user 现在是代理对象，  obj 是目标对象

    const user = reactive<any>(obj)
    console.log(user)

    // function updateUser(){
    //   console.log();
    // }
    const updateUser = () => {
      console.log(user)
      //直接使用目标对象的方式来更新目标目标对象中的成员是不可能的，  只能使用代理对象的方式来更新数据，（因为代理对象是响应式数据）
      // obj.nme += "==="
      //  下面的可以
      // ;(user.name += "=="), (user.age += 2)
      // user.friend.name += "++"
      // user.friend.age += 1
      // user.friend.cars[0] = "玛莎拉蒂"

      // user ---> 代理对象，obj----> 目标对象
      // user对象或者obj对象添加一个新的属性，哪一种方式会影响界面的更新
      // obj.gender = "男" //  这种方式， 界面没有更新渲染
      // user.gender = "woman" // 这种方式。可以界面更新渲染， 而且这个数据最终也添加到了obj对象上了
      // user对象或者obj对象移除一个已存在的属性，哪一种方式会影响界面的更新
      // delete obj.age    //  这种方式，界面没有更新渲染， obj中确实没有了age这个对象
      // delete user.age   // 这种方式，界面更新渲染了，obj中确实没有AGE 这个属性

      // 总结：  如果操作代理对象，目标对象中的数据也会随着变化，同时如果想要在操作数据的时候，界面也要跟着重新更新渲染，那么也是操作代理对象
      // user.friend.cars[1] = " 玛莎拉蒂"

      // 通过当前的代理对象把 目标对象中的某个数组属性添加一个新的属性
      user.friend.cars[3] = "兰博基尼"
    }
    return {
      user,
      updateUser,
    }
  },
})
</script>
<style></style>
