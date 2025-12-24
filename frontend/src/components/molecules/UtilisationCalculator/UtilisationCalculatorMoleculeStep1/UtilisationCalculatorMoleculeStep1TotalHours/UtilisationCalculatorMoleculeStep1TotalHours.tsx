import { useTranslation } from "react-i18next";
import { CustomTextField, CustomTypography } from "../../../../atoms/index";
import { UtilisationCalculatorMoleculeStep1TotalHoursProps } from "./UtilisationCalculatorMoleculeStep1TotalHours.types";
import "./UtilisationCalculatorMoleculeStep1TotalHours.scss";

export default function UtilisationCalculatorMoleculeStep1TotalHours({
  value,
  onChange,
  name,
  onBlur,
  error,
  helperText,
}: UtilisationCalculatorMoleculeStep1TotalHoursProps) {
  const { t } = useTranslation();

  return (
    <div className="utilisation-calculator-molecule-step1-total-hours">
      <CustomTypography variant="body1" color="black">
        {t("utilisationCalculator.fields.totalHours.label")}
      </CustomTypography>
      <CustomTextField
        type="number"
        placeholder={t("utilisationCalculator.fields.totalHours.placeholder")}
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
