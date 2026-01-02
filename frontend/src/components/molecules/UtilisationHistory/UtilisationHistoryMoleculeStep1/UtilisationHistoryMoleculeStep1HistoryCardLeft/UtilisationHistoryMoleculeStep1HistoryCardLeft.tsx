import { useTranslation } from "react-i18next";
import { CustomTypography } from "../../../../atoms/index";
import { formatDateWithTime } from "../../../../../utils/dateFormatters";
import { UtilisationHistoryMoleculeStep1HistoryCardLeftProps } from "./UtilisationHistoryMoleculeStep1HistoryCardLeft.types";
import "./UtilisationHistoryMoleculeStep1HistoryCardLeft.scss";

export default function UtilisationHistoryMoleculeStep1HistoryCardLeft({
  percentage,
  target,
  calculatedAt,
  meetsTarget,
}: UtilisationHistoryMoleculeStep1HistoryCardLeftProps) {
  const { t, i18n } = useTranslation();

  let color: "success" | "error";
  if (meetsTarget) {
    color = "success";
  } else {
    color = "error";
  }

  return (
    <div className="utilisation-history-molecule-step1-history-card-left">
      <CustomTypography variant="h6" color={color}>
        {percentage}%
      </CustomTypography>
      <CustomTypography variant="body2" color="black">
        {t("utilisationHistory.target", { target })}
      </CustomTypography>
      <CustomTypography variant="body2" color="black">
        {formatDateWithTime(calculatedAt, i18n.language)}
      </CustomTypography>
    </div>
  );
}
