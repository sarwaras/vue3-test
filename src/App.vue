<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo" />
      <Footer :todos="todos" :checkAll="checkAll" :clearAllCompeletedTodos="clearAllCompeletedTodos" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue"

import Header from "./componnets/Header.vue"
import Footer from "./componnets/Footer.vue"
import List from "./componnets/List.vue"
// import { Todo } from "./type/todo"

import { readTodos, saveTodos } from "./utils/localStorageUtils"

//  定义应该接口， 约束state的数据类型
interface Todo {
  id: number
  title: string
  isCompeleted: boolean
}

export default defineComponent({
  name: "App",
  components: { Header, Footer, List },

  //  数据应该用数组来存储，数组中的每个数据都一个对象，对象中应该有三个属性(id , title , isCompeleted)
  //  把数组暂且定义在 APP.VUE 父组件里
  setup() {
    //   定义一个数组数据
    // const state = reactive<{ todos: Todo[] }>({
    //   todos: [
    //     { id: 1, title: "奔驰", isCompeleted: false },
    //     { id: 2, title: "兰博基尼", isCompeleted: false },
    //     { id: 3, title: "道奇", isCompeleted: false },
    //   ],
    // })

    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    })

    //  界面架子啊完毕 国会子啊读取数据
    onMounted(() => {
      setTimeout(() => {
        state.todos = readTodos()
      }, 500)
    })

    //  添加数据的方法
    const addTodo = (todo: any) => {
      console.log(todo)
      state.todos.unshift(todo)
    }

    //  删除数据的方法
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1)
      console.log(index)
    }
    //  修改todo 中的 isCompeleted 属性的昨天

    const updateTodo = (todo: Todo, isCompeleted: boolean) => {
      todo.isCompeleted = isCompeleted
      console.log(todo)
    }

    //  footer 组件中 全选或者全不选的情况
    const checkAll = (isCompeleted: boolean) => {
      state.todos.forEach(todo => {
        todo.isCompeleted = isCompeleted
      })
    }

    //
    const clearAllCompeletedTodos = () => {
      state.todos = state.todos.filter(todo => !todo.isCompeleted)
    }

    //  监视  :  如果todos 数组的数据变化了， 直接存储到浏览器的缓存中
    // watch(
    //   () => state.todos,
    //   value => {
    //     //  保存到浏览器的缓存中
    //     localStorage.setItem("todos_key", JSON.stringify(value))
    //   },
    //   { deep: true }
    // )

    watch(() => state.todos, saveTodos, { deep: true })

    return {
      ...toRefs(state),
      addTodo,
      deleteTodo,
      updateTodo,
      checkAll,
      clearAllCompeletedTodos,
    }
  },
})
</script>
<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-warp {
  padding: 10px;
  border: 1px solid#ddd;
  border-radius: 5px;
}
</style>
