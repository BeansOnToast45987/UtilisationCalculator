import { Pagination } from '@mui/material'
import { CustomPaginationProps } from './CustomPagination.types'
import './CustomPagination.scss'

export default function CustomPagination({
  count,
  page,
  onChange,
  showFirstButton = false,
  showLastButton = false,
}: CustomPaginationProps) {
  return (
    <Pagination
      className="custom-pagination"
      count={count}
      page={page}
      onChange={onChange}
      color="primary"
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
    />
  )
}
