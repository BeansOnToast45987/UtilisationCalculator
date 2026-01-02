import { useTranslation } from "react-i18next";
import { CustomTypography, CustomProgressBar } from "../../../../atoms/index";
import { UtilisationCalculatorMoleculeStep4LabeledProgressBarProps } from "./UtilisationCalculatorMoleculeStep4LabeledProgressBar.types";
import "./UtilisationCalculatorMoleculeStep4LabeledProgressBar.scss";

export default function UtilisationCalculatorMoleculeStep4LabeledProgressBar({
  percentage,
  status,
  value,
  target,
  color,
}: UtilisationCalculatorMoleculeStep4LabeledProgressBarProps) {
  const { t } = useTranslation();

  return (
    <div className="utilisation-calculator-molecule-step4-labeled-progress-bar-wrapper">
      <div className="utilisation-calculator-molecule-step4-labeled-progress-bar-header">
        <CustomTypography variant="h3" color={color}>
          {percentage}%
        </CustomTypography>
        <CustomTypography variant="h6" color={color}>
          {status}
        </CustomTypography>
      </div>
      <CustomProgressBar value={value} variant="determinate" color={color} />
      <div className="utilisation-calculator-molecule-step4-labeled-progress-bar-labels">
        <CustomTypography variant="body2" color="black">
          {t("utilisationCalculator.results.progressMin")}
        </CustomTypography>
        <CustomTypography variant="body2" color="black">
          {t("utilisationCalculator.results.progressTarget", { target })}
        </CustomTypography>
        <CustomTypography variant="body2" color="black">
          {t("utilisationCalculator.results.progressMax")}
        </CustomTypography>
      </div>
    </div>
  );
}
