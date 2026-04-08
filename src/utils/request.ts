import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import useUserStore from '@/store/modules/user'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import router from '@/router'
import { ElLoading } from 'element-plus'

let loading: any

function startLoading() {
  loading = ElLoading.service({
    lock: true,
    text: '拼命加載中.....',
    background: 'rgba(255,255,255,0.6)',
  })
}

function endLoading() {
  loading?.close()
}

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 500000,
})

request.interceptors.request.use(
  (config: import('axios').InternalAxiosRequestConfig) => {
    if (
      config.url &&
      config.url !== '/order/new' &&
      !/^\/order\/\d+$/.test(config.url)
    ) {
      startLoading()
    }

    const tokenValue = GET_TOKEN()
    if (tokenValue) {
      config.headers = {
        ...config.headers,
        'X-CSRF-TOKEN': tokenValue,
        'X-XSRF-TOKEN': tokenValue,
        token: tokenValue,
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    endLoading()

    if (response.config.url === '/login') {
      const cookieValue = document.cookie.replace(
        /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
        '$1',
      )
      SET_TOKEN(cookieValue)
    }

    return response.data
  },
  (error) => {
    endLoading()
    const userStore = useUserStore()
    let message = ''

    if (error.response) {
      const status = error.response.status

      switch (status) {
        case 203:
          message = '服务异常'
          break
        case 401:
          userStore.userClear()
          router.push('/login')
          message = '未登錄'
          break
        case 403:
          router.push('/login')
          userStore.userClear()
          message = '登錄過期，請重新登錄'
          break
        case 404:
          message = '網絡請求不存在'
          break
        case 500:
          message = '服務器出現問題'
          break
        default:
          message = error.response.data?.message || '未知錯誤'
          break
      }

      console.error('API Error:', message)
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

// 泛型封裝 request 函式
export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  return request(config) as Promise<T>
}

export default request
