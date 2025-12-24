import { useTranslation } from "react-i18next";
import { CustomTypography, CustomButton } from "../../../../atoms/index";
import { formatDate } from "../../../../../utils/dateFormatters";
import { UtilisationHistoryMoleculeStep1HistoryCardRightProps } from "./UtilisationHistoryMoleculeStep1HistoryCardRight.types";
import "./UtilisationHistoryMoleculeStep1HistoryCardRight.scss";

export default function UtilisationHistoryMoleculeStep1HistoryCardRight({
  id,
  startDate,
  endDate,
  billableHours,
  totalHours,
  onDelete,
}: UtilisationHistoryMoleculeStep1HistoryCardRightProps) {
  const { t, i18n } = useTranslation();

  return (
    <div className="utilisation-history-molecule-step1-history-card-right">
      <CustomButton
        buttonType="four"
        ariaLabel="utilisation-history-molecule-step1-history-card-right-delete-button"
        onClick={() => onDelete(id)}
      />
      <CustomTypography variant="body2" color="black">
        {t("utilisationHistory.billableHours", {
          billable: billableHours,
          total: totalHours,
        })}
      </CustomTypography>
      <CustomTypography variant="body2" color="black">
        {t("utilisationHistory.period", {
          start: formatDate(startDate, i18n.language),
          end: formatDate(endDate, i18n.language),
        })}
      </CustomTypography>
    </div>
  );
}
