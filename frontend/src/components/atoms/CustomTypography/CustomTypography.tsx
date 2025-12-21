import { Typography } from '@mui/material'
import { CustomTypographyProps } from './CustomTypography.types'
import './CustomTypography.scss'

export default function CustomTypography({
  children,
  variant,
  color,
  align,
  gutterBottom,
  noWrap,
  component,
  id,
  className,
}: CustomTypographyProps) {
  return (
    <Typography
      variant={variant}
      className={`custom-typography ${className || ''}`}
      style={{ color: `var(--color-${color})` }}
      align={align}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      {...(component && { component })}
      id={id}
    >
      {children}
    </Typography>
  )
}
