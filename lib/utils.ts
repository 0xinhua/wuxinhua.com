import { parseISO, format } from 'date-fns'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const formatDate = (dateString, formatStr = 'yyyy年 MM月dd日') => {
  if (dateString) {
    const date = parseISO(dateString)
    return format(date, formatStr)
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}