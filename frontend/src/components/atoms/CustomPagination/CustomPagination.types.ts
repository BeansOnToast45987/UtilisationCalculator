export interface CustomPaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  showFirstButton?: boolean;
  showLastButton?: boolean;
}
