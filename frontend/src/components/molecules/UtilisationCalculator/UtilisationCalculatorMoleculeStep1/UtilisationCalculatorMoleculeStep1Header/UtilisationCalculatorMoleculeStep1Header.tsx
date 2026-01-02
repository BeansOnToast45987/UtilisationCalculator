import { useTranslation } from "react-i18next";
import { CustomTypography, CustomTooltip } from "../../../../atoms/index";
import "./UtilisationCalculatorMoleculeStep1Header.scss";

export default function UtilisationCalculatorMoleculeStep1Header() {
  const { t } = useTranslation();

  return (
    <div className="utilisation-calculator-molecule-step1-header">
      <div className="utilisation-calculator-molecule-step1-header-title">
        <CustomTypography variant="h6" color="black">
          {t("utilisationCalculator.title")}
        </CustomTypography>
        <CustomTooltip text={t("utilisationCalculator.information")} />
      </div>
      <CustomTypography variant="body1" color="black">
        {t("utilisationCalculator.subtitle")}
      </CustomTypography>
    </div>
  );
}
