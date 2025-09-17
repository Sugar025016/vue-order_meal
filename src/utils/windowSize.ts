import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

// 使用 VueUse 的 useWindowSize 来获取窗口大小
const { width } = useWindowSize()

// 根据窗口宽度决定是否显示工具栏
const isBreakpointXS = computed(() => {
  // 这里可以根据实际情况调整断点的值
  return width.value >= 540 // 例如，当窗口宽度大于等于 540px 时显示工具栏
})

const isBreakpointSM = computed(() => {
  return width.value >= 720
})

const isBreakpointMD = computed(() => {
  return width.value >= 960
})
const isBreakpointLG = computed(() => {
  return width.value >= 1140
})
const isBreakpointXL = computed(() => {
  return width.value >= 1320
})
const isBreakpointXXL = computed(() => {
  return width.value >= 1500
})

export {
  isBreakpointXS,
  isBreakpointSM,
  isBreakpointMD,
  isBreakpointLG,
  isBreakpointXL,
  isBreakpointXXL,
}
