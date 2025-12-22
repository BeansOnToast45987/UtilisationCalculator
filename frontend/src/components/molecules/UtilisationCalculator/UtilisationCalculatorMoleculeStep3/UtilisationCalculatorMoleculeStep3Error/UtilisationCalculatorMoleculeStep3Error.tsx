import { useTranslation } from "react-i18next";
import { CustomTypography, CustomButton } from "../../../../atoms/index";
import { UtilisationCalculatorMoleculeStep3ErrorProps } from "./UtilisationCalculatorMoleculeStep3Error.types";
import "./UtilisationCalculatorMoleculeStep3Error.scss";

export default function UtilisationCalculatorMoleculeStep3Error({
  error,
  onClose,
}: UtilisationCalculatorMoleculeStep3ErrorProps) {
  const { t } = useTranslation();

  return (
    <div className="utilisation-calculator-molecule-step3-error">
      <div className="utilisation-calculator-molecule-step3-error-header">
        <CustomTypography variant="h6" color="error">
          {t("utilisationCalculator.errors.title")}
        </CustomTypography>
        <CustomButton
          onClick={onClose}
          ariaLabel="utilisation-calculator-molecule-step3-error-close-button"
          buttonType="three"
        />
      </div>
      <div className="utilisation-calculator-molecule-step3-error-content">
        <CustomTypography variant="body1" color="error">
          {error.message}
        </CustomTypography>
      </div>
    </div>
  );
}
