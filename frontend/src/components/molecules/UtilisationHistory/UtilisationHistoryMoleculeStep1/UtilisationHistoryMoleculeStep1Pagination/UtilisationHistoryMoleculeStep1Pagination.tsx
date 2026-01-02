import { CustomPagination } from "../../../../atoms/index";
import { UtilisationHistoryMoleculeStep1PaginationProps } from "./UtilisationHistoryMoleculeStep1Pagination.types";
import "./UtilisationHistoryMoleculeStep1Pagination.scss";

export default function UtilisationHistoryMoleculeStep1Pagination({
  count,
  page,
  onChange,
}: UtilisationHistoryMoleculeStep1PaginationProps) {
  return (
    <div className="utilisation-history-molecule-step1-pagination-container">
      <CustomPagination
        count={count}
        page={page}
        onChange={onChange}
        showFirstButton
        showLastButton
      />
    </div>
  );
}
