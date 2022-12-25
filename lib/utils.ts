import { parseISO, format } from 'date-fns'

export const formatDate = (dateString, formatStr = 'yyyy年 MM月dd日') => {
  if (dateString) {
    const date = parseISO(dateString)
    return format(date, formatStr)
  }
}