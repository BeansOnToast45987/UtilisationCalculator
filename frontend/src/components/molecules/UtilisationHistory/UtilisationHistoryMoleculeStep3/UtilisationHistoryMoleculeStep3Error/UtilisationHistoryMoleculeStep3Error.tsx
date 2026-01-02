import { useTranslation } from "react-i18next";
import { CustomTypography, CustomButton } from "../../../../atoms/index";
import { UtilisationHistoryMoleculeStep3ErrorProps } from "./UtilisationHistoryMoleculeStep3Error.types";
import "./UtilisationHistoryMoleculeStep3Error.scss";

export default function UtilisationHistoryMoleculeStep3Error({
  error,
  onClose,
}: UtilisationHistoryMoleculeStep3ErrorProps) {
  const { t } = useTranslation();

  return (
    <div className="utilisation-history-molecule-step3-error">
      <div className="utilisation-history-molecule-step3-error-header">
        <CustomTypography variant="h6" color="error">
          {t("utilisationHistory.errors.title")}
        </CustomTypography>
        <CustomButton
          onClick={onClose}
          ariaLabel="utilisation-history-molecule-step3-error-close-button"
          buttonType="three"
        />
      </div>
      <div className="utilisation-history-molecule-step3-error-content">
        <CustomTypography variant="body1" color="error">
          {error.message}
        </CustomTypography>
      </div>
    </div>
  );
}
