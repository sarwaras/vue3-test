<template>
  <div>
    <h2>Child 子组件</h2>
    <h3>心态:{{ msg }}</h3>
    <!-- <h3>count:{{ count }}</h3> -->
    <button @click="emitClick">分发事件</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "App",
  props: ["msg"],

  //  setup 细节问题
  /*
            setup执行的时机
          在beforeCreate之前执行(一次), 此时组件对象还没有创建
          this是undefined, 不能通过this来访问data/computed/methods / props
          其实所有的composition API相关回调函数中也都不可以
            */
  //  setup 是在beforeCreate 生命周期函数之前执行了，而且只执行了一次
  //  由此可以推断出： setup 执行的时候，当前的组件还没创建出来，也就意味着： 组件实例对this根本就不能用
  //  this 是undefined，说明： 就不能通过this再去调用 data/computed/methods/props 中的相关内容了
  //  其实所有的composition API相关回调函数中也都不可以

  //   setup 中的返回值是对象内部的属性和方法是给HTML 模板使用的
  //   setup 中的对象内部的属性和 data函数中 return 对象的属性都可以在html 模板中使用
  //    setup 中的对象的而属性和 data 函数中的对象的属性会合并为组件对象的属性
  //    setup 中的对象的方法和data 函数中的对象中的方法会合并为组件对象的方法
  // 在vue3 中尽量不要混合的使用  data 和 setup 及 methods 和setup
  // 一般不要混合使用: methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods
  // setup不能是一个async函数: 因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性数据

  //  数据初始化的生命周期回调
  beforeCreate() {
    console.log("执行了生命周期函数")
  },

  setup(props, context) {
    //  props参数： 是一个对象，里面有父级组件向子级组件传递的数据，并且是在子级组件中使用props接收到的所有的属性
    //  props: 包含props配置声明且传入了的所有属性的对象  （在线笔记中的解析）
    // console.log(props.msg)
    // console.log(context.attrs)
    // console.log(context.emit)
    // context参数: 是一个对象， 里面有attrs 对象（获取当前组件标签上的所有属性的对象， 但是该属性是在props中没用声明接收的所有的属性的对象），  emit 方法 （分发事件的），  slots对象（插槽）
    /*
      attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
      slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
      emit: 用来分发自定义事件的函数, 相当于 this.$emit
    */
    console.log(context.attrs.msg2)

    console.log("setup 执行了", this)
    const showMsg1 = () => {
      console.log(" setup 中的 showMsg1 方法")
    }

    // 按钮的点击事件的回调函数
    function emitClick() {
      context.emit("xxx", "++")
      console.log(props)
    }
    return {
      showMsg1,
      emitClick,
      //   setup 中一般返回一个对象，对象中的属性和方法都可以在html模板中使用
    }
  },

  // data() {
  //   return {
  //     count: 10,
  //   }
  // },
  //  界面渲染完毕
  // mounted() {
  //   console.log(this)
  // },

  //  方法
  // methods: {
  //   showMsg2() {
  //     console.log("methods 中的 showMsg2 方法")
  //   },
  // },
})
</script>
