import { useAnimatedNumber } from '../../hooks/useAnimatedNumber'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, suffix = '', duration = 1200, className }: AnimatedCounterProps) {
  const display = useAnimatedNumber(value, duration)
  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  )
}
