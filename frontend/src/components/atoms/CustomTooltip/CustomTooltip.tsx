import { Tooltip, IconButton } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { CustomTooltipProps } from './CustomTooltip.types'
import './CustomTooltip.scss'

export default function CustomTooltip({ text }: CustomTooltipProps) {
  return (
    <div className="custom-tooltip-container">
      <Tooltip
        title={text}
        arrow
        placement="bottom"
        classes={{ tooltip: 'custom-tooltip' }}
      >
        <IconButton size="small" className="custom-tooltip-icon">
          <InfoOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  )
}
