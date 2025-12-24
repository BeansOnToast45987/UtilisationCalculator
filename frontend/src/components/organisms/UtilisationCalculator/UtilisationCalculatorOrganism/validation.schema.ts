import * as Yup from "yup";
import { TFunction } from "i18next";

export const getValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    startDate: Yup.date()
      .required(t("utilisationCalculator.fields.startDate.required"))
      .typeError(t("utilisationCalculator.fields.startDate.invalid")),
    endDate: Yup.date()
      .required(t("utilisationCalculator.fields.endDate.required"))
      .typeError(t("utilisationCalculator.fields.endDate.invalid"))
      .min(
        Yup.ref("startDate"),
        t("utilisationCalculator.fields.endDate.mustBeAfterStart"),
      )
      .test(
        "max-duration",
        t("utilisationCalculator.fields.endDate.maxDuration"),
        function (endDate) {
          const { startDate } = this.parent;
          if (!startDate || !endDate) return true;
          const daysDiff =
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
          return daysDiff <= 365;
        },
      ),
    totalHours: Yup.number()
      .required(t("utilisationCalculator.fields.totalHours.required"))
      .typeError(t("utilisationCalculator.fields.totalHours.mustBeNumber"))
      .min(0.01, t("utilisationCalculator.fields.totalHours.minValue"))
      .max(8760, t("utilisationCalculator.fields.totalHours.maxValue")),
    billableHours: Yup.number()
      .required(t("utilisationCalculator.fields.billableHours.required"))
      .typeError(t("utilisationCalculator.fields.billableHours.mustBeNumber"))
      .min(0, t("utilisationCalculator.fields.billableHours.minValue"))
      .test(
        "min-if-non-zero",
        t("utilisationCalculator.fields.billableHours.minNonZero"),
        (value) => value === 0 || value === undefined || value >= 0.01,
      )
      .test(
        "max-total",
        t("utilisationCalculator.fields.billableHours.exceedsTotal"),
        function (billableHours) {
          const { totalHours } = this.parent;
          if (!billableHours || !totalHours) return true;
          return billableHours <= totalHours;
        },
      ),
    targetUtilisation: Yup.number()
      .required(t("utilisationCalculator.fields.targetUtilisation.required"))
      .typeError(
        t("utilisationCalculator.fields.targetUtilisation.mustBeNumber"),
      )
      .min(1, t("utilisationCalculator.fields.targetUtilisation.minValue"))
      .max(100, t("utilisationCalculator.fields.targetUtilisation.maxValue")),
  });
