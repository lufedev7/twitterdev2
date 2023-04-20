import { useEffect, useState } from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]
const getDateDiffs = timestamp => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000
  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}
export default function useTimeAgo (timestamp) {
  const [timeAgo, setTimeout] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeout(newTimeAgo)
    }, 60000)
    return () => clearInterval(interval)
  }, [timestamp])
  const rft = new Intl.RelativeTimeFormat('es', { style: 'short' })
  const { value, unit } = timeAgo
  return rft.format(value, unit)
}
