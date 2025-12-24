import { useTranslation } from "react-i18next";
import { CustomTypography, CustomDivider } from "../../../../atoms/index";
import { UtilisationCalculatorMoleculeStep4UtilisationSummaryCardProps } from "./UtilisationCalculatorMoleculeStep4UtilisationSummaryCard.types";
import "./UtilisationCalculatorMoleculeStep4UtilisationSummaryCard.scss";

export default function UtilisationCalculatorMoleculeStep4UtilisationSummaryCard({
  message,
  messageColor,
  totalHours,
  billableHours,
  target,
}: UtilisationCalculatorMoleculeStep4UtilisationSummaryCardProps) {
  const { t } = useTranslation();

  return (
    <div className="utilisation-calculator-molecule-step4-utilisation-summary-card">
      <CustomTypography variant="body1" color={messageColor}>
        {message}
      </CustomTypography>
      <CustomDivider flexItem={true} />
      <div className="utilisation-calculator-molecule-step4-utilisation-summary-card-row">
        <div className="utilisation-calculator-molecule-step4-utilisation-summary-card-item">
          <CustomTypography variant="body2" color="black">
            {t("utilisationCalculator.results.totalHours")}
          </CustomTypography>
          <CustomTypography variant="h6" color="black">
            {totalHours}
          </CustomTypography>
        </div>
        <div className="utilisation-calculator-molecule-step4-utilisation-summary-card-item">
          <CustomTypography variant="body2" color="black">
            {t("utilisationCalculator.results.billableHours")}
          </CustomTypography>
          <CustomTypography variant="h6" color="black">
            {billableHours}
          </CustomTypography>
        </div>
      </div>
      <div className="utilisation-calculator-molecule-step4-utilisation-summary-card-item">
        <CustomTypography variant="body2" color="black">
          {t("utilisationCalculator.results.target")}
        </CustomTypography>
        <CustomTypography variant="h6" color="black">
          {target}%
        </CustomTypography>
      </div>
    </div>
  );
}
