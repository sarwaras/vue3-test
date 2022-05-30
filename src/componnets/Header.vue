<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入任务名称,按回车键确认" @keyup.enter="add" v-model="title" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
export default defineComponent({
  name: "Header",
  props: {
    addTodo: {
      type: Function,
      required: true,
    },
  },

  setup(props) {
    //
    const title = ref("")

    const add = () => {
      console.log()

      //  获取文本框里输入的数据，判断不为空
      const text = title.value
      if (!text.trim()) return
      //  此时有数据，创建一个 todo 对象
      const todo = {
        id: Date.now(),
        title: text,
        isCompeleted: false,
      }
      //  调用方法   addTodo 的方法
      props.addTodo(todo)
      //  清空文本框
      title.value = ""
    }
    return {
      add,
      title,
    }
  },
})
</script>
<style scoped>
.todo-header input {
  width: 560px;
  height: 25px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.todo-header input:focus {
  outline: none;
  border-color: rgba(82, ·168, ·236, ·0.8);
  box-shadow: inset 0 1px 1px rgba(0, ·0, ·0, ·0.075), 0 0 8px rgba(82, ·168, ·236, ·0.6);
}
</style>
