import { useTranslation } from "react-i18next";
import { CustomTextField, CustomTypography } from "../../../../atoms/index";
import { UtilisationCalculatorMoleculeStep1BillableHoursProps } from "./UtilisationCalculatorMoleculeStep1BillableHours.types";
import "./UtilisationCalculatorMoleculeStep1BillableHours.scss";

export default function UtilisationCalculatorMoleculeStep1BillableHours({
  value,
  onChange,
  name,
  onBlur,
  error,
  helperText,
}: UtilisationCalculatorMoleculeStep1BillableHoursProps) {
  const { t } = useTranslation();

  return (
    <div className="utilisation-calculator-molecule-step1-billable-hours">
      <CustomTypography variant="body1" color="black">
        {t("utilisationCalculator.fields.billableHours.label")}
      </CustomTypography>
      <CustomTextField
        type="number"
        placeholder={t(
          "utilisationCalculator.fields.billableHours.placeholder",
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
