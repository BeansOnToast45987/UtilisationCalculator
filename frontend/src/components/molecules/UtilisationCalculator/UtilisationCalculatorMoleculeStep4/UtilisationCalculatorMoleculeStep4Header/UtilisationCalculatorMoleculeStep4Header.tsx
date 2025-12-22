import { useTranslation } from "react-i18next";
import { CustomTypography, CustomButton } from "../../../../atoms/index";
import { UtilisationCalculatorMoleculeStep4HeaderProps } from "./UtilisationCalculatorMoleculeStep4Header.types";
import "./UtilisationCalculatorMoleculeStep4Header.scss";

export default function UtilisationCalculatorMoleculeStep4Header({
  onClose,
}: UtilisationCalculatorMoleculeStep4HeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="utilisation-calculator-molecule-step4-header">
      <CustomTypography variant="h6" color="black">
        {t("utilisationCalculator.results.title")}
      </CustomTypography>
      <CustomButton
        onClick={onClose}
        ariaLabel="utilisation-calculator-molecule-step4-header-close-button"
        buttonType="three"
      />
    </div>
  );
}
