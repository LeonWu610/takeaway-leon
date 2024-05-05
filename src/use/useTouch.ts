import { ref } from 'vue'

const getDirection = (x: number, y: number) => {
  if (x > y) { //如果 X 方向上的位移量大于 Y 方向上的位移量，则手势方向为水平
    return 'horizontal'
  }
  if (y > x) {
    return 'vertical'
  }
  return ''
}

export function useTouch() {
  const startX = ref(0)
  const startY = ref(0)
  const deltaX = ref(0)
  const deltaY = ref(0)
  const offsetX = ref(0)
  const offsetY = ref(0)
  const direction = ref('')
  const isVertical = () => direction.value === 'vertical'
  const isHorizontal = () => direction.value === 'horizontal'

  const reset = () => {
    deltaX.value = 0
    deltaY.value = 0
    offsetX.value = 0
    offsetY.value = 0
  }

  const start = (event: TouchEvent) => {
    reset()
    startX.value = event.touches[0].clientX //触摸事件开始时记录的 X 坐标值
    startY.value = event.touches[0].clientY //响应式变量，会随着用户的触摸行为而改变
  }
  const move = (event: TouchEvent) => {
    const touch = event.touches[0] //一个触摸事件的列表，包含了所有当前触摸屏幕的手指信息。

    deltaX.value = (touch.clientX < 0 ? 0 : touch.clientX) - startX.value 
    deltaY.value = touch.clientY - startY.value //计算了触摸在 Y 轴上的移动距离
    offsetX.value = Math.abs(deltaX.value)
    offsetY.value = Math.abs(deltaY.value)

    const LOCK_DIRECTION_DISTANCE = 10
    if (
      !direction.value ||
      (offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE)
    ) {
      direction.value = getDirection(offsetX.value, offsetY.value)
    }
  }

  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
  }
}
