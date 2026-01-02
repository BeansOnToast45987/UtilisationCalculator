import { useTranslation } from "react-i18next";
import { CustomDatePicker, CustomTypography } from "../../../../atoms/index";
import { UtilisationCalculatorMoleculeStep1StartDateProps } from "./UtilisationCalculatorMoleculeStep1StartDate.types";
import "./UtilisationCalculatorMoleculeStep1StartDate.scss";

export default function UtilisationCalculatorMoleculeStep1StartDate({
  value,
  onChange,
  name,
  onBlur,
  error,
  helperText,
}: UtilisationCalculatorMoleculeStep1StartDateProps) {
  const { t } = useTranslation();

  return (
    <div className="utilisation-calculator-molecule-step1-start-date">
      <CustomTypography variant="body1" color="black">
        {t("utilisationCalculator.fields.startDate.label")}
      </CustomTypography>
      <CustomDatePicker
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
