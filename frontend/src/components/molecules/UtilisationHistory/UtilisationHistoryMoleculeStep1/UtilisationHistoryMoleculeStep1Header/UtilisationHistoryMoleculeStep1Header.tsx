import { useTranslation } from "react-i18next";
import { CustomTypography, CustomTooltip } from "../../../../atoms/index";
import "./UtilisationHistoryMoleculeStep1Header.scss";

export default function UtilisationHistoryMoleculeStep1Header() {
  const { t } = useTranslation();

  return (
    <div className="utilisation-history-molecule-step1-header">
      <div className="utilisation-history-molecule-step1-header-title">
        <CustomTypography variant="h6" color="black">
          {t("utilisationHistory.title")}
        </CustomTypography>
        <CustomTooltip text={t("utilisationHistory.information")} />
      </div>
    </div>
  );
}
