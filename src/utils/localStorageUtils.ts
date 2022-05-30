interface Todo {
  id: number
  title: string
  isCompeleted: boolean
}

export function saveTodos(todos: Todo[]) {
  //
  localStorage.setItem("todos_key", JSON.stringify(todos))
}

//  从浏览器的缓存中读取数据
export function readTodos(): Todo[] {
  return JSON.parse(localStorage.getItem("todos_key") || "[]")
}
