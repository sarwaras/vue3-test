import { onMounted, ref } from "vue"
export default function () {
  const x = ref(-1)
  const y = ref(-1)

  //  点击事件的回调函数
  const clickHander = (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
  }
  //  页面加载完毕了， 再进行点击的操作
  //  页面加载完毕的生命周期
  onMounted(() => {
    console.log()
    window.addEventListener("click", clickHander)
  })

  // 页面卸载之前的生命周期

  return {
    x,
    y,
  }
}
