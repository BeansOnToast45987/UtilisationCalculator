import { useTranslation } from "react-i18next";
import { CustomTextField, CustomTypography } from "../../../../atoms/index";
import { UtilisationCalculatorMoleculeStep1TargetUtilisationProps } from "./UtilisationCalculatorMoleculeStep1TargetUtilisation.types";
import "./UtilisationCalculatorMoleculeStep1TargetUtilisation.scss";

export default function UtilisationCalculatorMoleculeStep1TargetUtilisation({
  value,
  onChange,
  name,
  onBlur,
  error,
  helperText,
}: UtilisationCalculatorMoleculeStep1TargetUtilisationProps) {
  const { t } = useTranslation();

  return (
    <div className="utilisation-calculator-molecule-step1-target-utilisation">
      <CustomTypography variant="body1" color="black">
        {t("utilisationCalculator.fields.targetUtilisation.label")}
      </CustomTypography>
      <CustomTextField
        type="number"
        placeholder={t(
          "utilisationCalculator.fields.targetUtilisation.placeholder",
        )}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
      />
    </div>
  );
}
