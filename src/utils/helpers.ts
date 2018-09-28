const toZero: string = (n: number) => n < 10 ? `0${n}` : `${n}`

export const formatTime: string = (hours: number, minutes: number) => `${toZero(hours)}:${toZero(minutes)}`
