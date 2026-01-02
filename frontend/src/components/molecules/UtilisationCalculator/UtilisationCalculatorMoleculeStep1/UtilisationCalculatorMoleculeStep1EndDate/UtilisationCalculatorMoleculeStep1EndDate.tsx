import { useTranslation } from "react-i18next";
import { CustomDatePicker, CustomTypography } from "../../../../atoms/index";
import { UtilisationCalculatorMoleculeStep1EndDateProps } from "./UtilisationCalculatorMoleculeStep1EndDate.types";
import "./UtilisationCalculatorMoleculeStep1EndDate.scss";

export default function UtilisationCalculatorMoleculeStep1EndDate({
  value,
  onChange,
  name,
  onBlur,
  error,
  helperText,
}: UtilisationCalculatorMoleculeStep1EndDateProps) {
  const { t } = useTranslation();

  return (
    <div className="utilisation-calculator-molecule-step1-end-date">
      <CustomTypography variant="body1" color="black">
        {t("utilisationCalculator.fields.endDate.label")}
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
