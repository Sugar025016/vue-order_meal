export const getTime = () => {
  let msg = ''
  const hours = new Date().getHours()
  if (hours <= 9) {
    msg = '早上'
  } else if (hours <= 12) {
    msg = '上午'
  } else if (hours <= 18) {
    msg = '下午'
  } else {
    msg = '晚上'
  }
  return msg
}

export const deleteSecond = (time: string) => {
  const parts = time.split(':')
  const hours = parts[0]
  const minutes = parts[1]
  const newTime = `${hours}:${minutes}`

  return newTime
}

export const formatTime = (today: Date) => {
  const year = today.getFullYear()
  const month = today.getMonth() + 1 // 月份从0开始，所以要加1
  const day = today.getDate()
  const hours = today.getHours()
  const minutes = today.getMinutes()
  const seconds = today.getSeconds()

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

import moment from 'moment'
export const formatDate = (row: any, column: any) => {
  const date = row.takeTime
  let formattedDate
  if (column.columnKey === 'date') {
    formattedDate = moment(date).format('YYYY-MM-DD')
  }
  if (column.columnKey === 'time') {
    formattedDate = moment(date).format('HH:mm:ss')
  }
  // 使用您想要的日期格式
  return formattedDate
}
