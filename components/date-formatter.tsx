import { parseISO, format, getDay } from 'date-fns'

type Props = {
  dateString: string
}

const getgetISOWeek = (dateString: string) => {
  const weekNumber = getDay(new Date(dateString))
  return `星期${['一', '二', '三', '四', '五', '六', '日'][weekNumber-1]}`

}

const DateFormatter = ({ dateString }: Props) => {
  if (dateString) {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, 'yyyy年MM月dd日')}</time>
  }
}

export default DateFormatter
