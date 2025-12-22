import { useTranslation } from "react-i18next";
import { CustomButton } from "../../../../atoms/index";
import { UtilisationCalculatorMoleculeStep1ButtonsProps } from "./UtilisationCalculatorMoleculeStep1Buttons.types";
import "./UtilisationCalculatorMoleculeStep1Buttons.scss";

export default function UtilisationCalculatorMoleculeStep1Buttons({
  onClear,
  disabled = false,
}: UtilisationCalculatorMoleculeStep1ButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="utilisation-calculator-molecule-step1-buttons">
      <CustomButton
        label={t("utilisationCalculator.buttons.calculate")}
        type="submit"
        variant="contained"
        color="primary"
        disabled={disabled}
        ariaLabel="utilisation-calculator-molecule-step1-buttons-calculate-button"
        buttonType="one"
      />
      <CustomButton
        label={t("utilisationCalculator.buttons.clear")}
        onClick={onClear}
        variant="outlined"
        ariaLabel="utilisation-calculator-molecule-step1-buttons-clear-button"
        buttonType="two"
      />
    </div>
  );
}
