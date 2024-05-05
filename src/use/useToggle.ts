import { type Ref, ref } from "vue";

export function useToggle(initState: boolean): [Ref<boolean>, () => void] {
  const state = ref(initState)
  const togggle = function () {
    state.value = !state.value
  }
  return [state, togggle]
}