//  引入 axios
import axios from "axios"
// import axios from "axios"
import { ref } from "vue"
// 发送  ajax 的请求
export default function (url: string) {
  //  加载状态
  const loading = ref(true)
  //  请求成功的数据
  const data = ref(null) // 坑
  // 错误信息
  const erroeMsg = ref("")

  //  发送请求
  axios
    .get(url)
    .then((response: any) => {
      //  改变加载状态
      loading.value = false
    })
    .catch((error: { message: string }) => {
      //  改变加载状态
      loading.value = false
      erroeMsg.value = error.message || "未知错误"
    })

  return {
    loading,
    data,
    erroeMsg,
  }
}
