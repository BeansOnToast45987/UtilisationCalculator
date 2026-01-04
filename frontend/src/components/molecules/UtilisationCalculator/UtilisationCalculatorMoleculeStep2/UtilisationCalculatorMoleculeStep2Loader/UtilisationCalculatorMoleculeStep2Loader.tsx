import { useTranslation } from "react-i18next";
import { CustomLoader, CustomTypography } from "../../../../atoms/index";
import "./UtilisationCalculatorMoleculeStep2Loader.scss";

export default function UtilisationCalculatorMoleculeStep2Loader() {
  const { t } = useTranslation();

  return (
    <>
      <div className="utilisation-calculator-molecule-step2-header">
        <CustomTypography variant="h6" color="black">
          {t("utilisationCalculator.title")}
        </CustomTypography>
      </div>
      <div className="utilisation-calculator-molecule-step2-loader">
        <CustomLoader size={75} color="inherit" />
        <CustomTypography variant="body1" color="black">
          {t("app.loading")}
        </CustomTypography>
      </div>
    </>
  );
}
