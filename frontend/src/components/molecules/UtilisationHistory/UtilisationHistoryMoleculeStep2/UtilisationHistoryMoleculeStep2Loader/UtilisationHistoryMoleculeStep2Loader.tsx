import { useTranslation } from "react-i18next";
import { CustomLoader, CustomTypography } from "../../../../atoms/index";
import "./UtilisationHistoryMoleculeStep2Loader.scss";

export default function UtilisationHistoryMoleculeStep2Loader() {
  const { t } = useTranslation();

  return (
    <div className="utilisation-history-molecule-step2-loader-container">
      <div className="utilisation-history-molecule-step2-loader-header">
        <CustomTypography variant="h6" color="black">
          {t("utilisationHistory.title")}
        </CustomTypography>
      </div>
      <div className="utilisation-history-molecule-step2-loader">
        <div className="utilisation-history-molecule-step2-loader-content">
          <CustomLoader size={75} />
          <CustomTypography variant="body1" color="black">
            {t("app.loading")}
          </CustomTypography>
        </div>
      </div>
    </div>
  );
}
