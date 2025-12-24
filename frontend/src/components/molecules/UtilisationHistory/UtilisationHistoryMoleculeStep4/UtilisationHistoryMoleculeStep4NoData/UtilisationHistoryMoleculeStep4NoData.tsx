import { useTranslation } from "react-i18next";
import { CustomTypography } from "../../../../atoms/index";
import "./UtilisationHistoryMoleculeStep4NoData.scss";

export default function UtilisationHistoryMoleculeStep4NoData() {
  const { t } = useTranslation();

  return (
    <div className="utilisation-history-molecule-step4-no-data-container">
      <div className="utilisation-history-molecule-step4-no-data-header">
        <CustomTypography variant="h6" color="black">
          {t("utilisationHistory.title")}
        </CustomTypography>
      </div>
      <div className="utilisation-history-molecule-step4-no-data-content">
        <CustomTypography variant="body1" color="black">
          {t("utilisationHistory.noData")}
        </CustomTypography>
      </div>
    </div>
  );
}
