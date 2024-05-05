import axios from "axios"
import { Dialog } from "vant"

const instance = axios.create({
  baseURL: 'http://117.72.72.34:8000/api'
})

instance.interceptors.response.use((response) => {
  const { data: _data } = response
  const { data, code, msg } = _data
  if (code !== 0) {
    Dialog.alert({
      message: msg
    }).then(() => {
      // 
    })
    return Promise.reject(msg)
    
  }
  return data
})

export default instance