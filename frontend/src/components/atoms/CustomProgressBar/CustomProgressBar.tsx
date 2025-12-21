import { LinearProgress } from '@mui/material'
import { CustomProgressBarProps } from './CustomProgressBar.types'
import './CustomProgressBar.scss'

export default function CustomProgressBar({
  value,
  variant,
  color,
}: CustomProgressBarProps) {
  return (
    <LinearProgress
      variant={variant}
      value={value}
      color={color}
      className="custom-progress-bar"
    />
  )
}
