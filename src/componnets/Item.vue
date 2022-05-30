<template>
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgColor, color: myColor }"
  >
    <label>
      <input type="checkbox" v-model="todo.isCompeleted" />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" style="display: none" v-show="isShow" @click="delTodo">删除</button>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
//  接口
interface Todo {
  id: number
  title: string
  isCompeleted: boolean
}
export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo, //  函数返回的是 todo 类型
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
  },

  setup(props) {
    //  背景颜色
    const bgColor = ref("white")
    //
    const myColor = ref("black")
    const isShow = ref(false)

    //  鼠标进入和离开的事件
    const mouseHandler = (flag: boolean) => {
      console.log()
      if (flag) {
        bgColor.value = "blue"
        myColor.value = "pink"
        isShow.value = true
      } else {
        bgColor.value = "white"
        myColor.value = "black"
        isShow.value = false
      }
    }

    //  删除数据的方法
    const delTodo = () => {
      // 提示
      if (window.confirm("确定要删除吗？")) {
        props.deleteTodo(props.index)
      }
    }

    //  计算属性的方式 来 让当前的复选框的内容选中/不选中
    const isCompeleted = computed({
      get() {
        return props.todo.isCompeleted
      },
      set(val) {
        props.updateTodo(props.todo, val)
        console.log(val)
      },
    })

    return {
      mouseHandler,
      bgColor,
      myColor,
      isShow,
      delTodo,
      isCompeleted,
    }
  },
})
</script>
<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li::before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
</style>
