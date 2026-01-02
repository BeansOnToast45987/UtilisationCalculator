import { useMemo } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import {
  UtilisationCalculatorMoleculeStep1Header,
  UtilisationCalculatorMoleculeStep1BillableHours,
  UtilisationCalculatorMoleculeStep1StartDate,
  UtilisationCalculatorMoleculeStep1EndDate,
  UtilisationCalculatorMoleculeStep1TotalHours,
  UtilisationCalculatorMoleculeStep1TargetUtilisation,
  UtilisationCalculatorMoleculeStep1Buttons,
  UtilisationCalculatorMoleculeStep2Loader,
  UtilisationCalculatorMoleculeStep3Error,
  UtilisationCalculatorMoleculeStep4Header,
  UtilisationCalculatorMoleculeStep4LabeledProgressBar,
  UtilisationCalculatorMoleculeStep4UtilisationSummaryCard,
} from "../../../molecules/index";
import { CalculateUtilisationInput } from "../../../../graphql/index";
import {
  CalculateUtilisationFormData,
  UtilisationCalculatorOrganismProps,
  UtilisationCalculatorResultOrganismProps,
} from "./UtilisationCalculatorOrganism.types";
import { getValidationSchema } from "./validation.schema";
import "./UtilisationCalculatorOrganism.scss";

const CALCULATOR_STEPS = {
  FORM: "form",
  LOADING: "loading",
  ERROR: "error",
} as const;

export default function UtilisationCalculatorOrganism({
  onSubmit,
  loading,
  error,
  onClose,
}: UtilisationCalculatorOrganismProps) {
  const { t } = useTranslation();
  const validationSchema = getValidationSchema(t);

  const initialValues: CalculateUtilisationFormData = {
    startDate: null,
    endDate: null,
    totalHours: "",
    billableHours: "",
    targetUtilisation: "",
  };

  const calculatorStep = useMemo(() => {
    if (loading) return CALCULATOR_STEPS.LOADING;
    if (error) return CALCULATOR_STEPS.ERROR;
    return CALCULATOR_STEPS.FORM;
  }, [loading, error]);

  const handleSubmit = async (data: CalculateUtilisationFormData) => {
    const input: CalculateUtilisationInput = {
      startDate: format(data.startDate as Date, "yyyy-MM-dd"),
      endDate: format(data.endDate as Date, "yyyy-MM-dd"),
      totalHours: Number(data.totalHours),
      billableHours: Number(data.billableHours),
      targetUtilisation: Number(data.targetUtilisation),
    };
    await onSubmit(input);
  };

  if (calculatorStep === CALCULATOR_STEPS.LOADING) {
    return <UtilisationCalculatorMoleculeStep2Loader />;
  }

  if (calculatorStep === CALCULATOR_STEPS.ERROR && error) {
    return (
      <UtilisationCalculatorMoleculeStep3Error
        error={error}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="utilisation-calculator-organism-container">
      <UtilisationCalculatorMoleculeStep1Header />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, resetForm }: any) => (
          <Form className="utilisation-calculator-organism-form">
            <div className="utilisation-calculator-organism-fields">
              <Field name="startDate">
                {({ field, meta }: FieldProps) => (
                  <UtilisationCalculatorMoleculeStep1StartDate
                    value={field.value}
                    onChange={(date: any) => setFieldValue(field.name, date)}
                    name={field.name}
                    onBlur={field.onBlur}
                    error={!!(meta.touched && meta.error)}
                    helperText={meta.error}
                  />
                )}
              </Field>
              <Field name="endDate">
                {({ field, meta }: FieldProps) => (
                  <UtilisationCalculatorMoleculeStep1EndDate
                    value={field.value}
                    onChange={(date: any) => setFieldValue(field.name, date)}
                    name={field.name}
                    onBlur={field.onBlur}
                    error={!!(meta.touched && meta.error)}
                    helperText={meta.error}
                  />
                )}
              </Field>
              <Field name="totalHours">
                {({ field, meta }: FieldProps) => (
                  <UtilisationCalculatorMoleculeStep1TotalHours
                    value={field.value}
                    onChange={(event: any) =>
                      setFieldValue(field.name, event.target.value)
                    }
                    name={field.name}
                    onBlur={field.onBlur}
                    error={!!(meta.touched && meta.error)}
                    helperText={meta.error}
                  />
                )}
              </Field>
              <Field name="billableHours">
                {({ field, meta }: FieldProps) => (
                  <UtilisationCalculatorMoleculeStep1BillableHours
                    value={field.value}
                    onChange={(event: any) =>
                      setFieldValue(field.name, event.target.value)
                    }
                    name={field.name}
                    onBlur={field.onBlur}
                    error={!!(meta.touched && meta.error)}
                    helperText={meta.error}
                  />
                )}
              </Field>
              <Field name="targetUtilisation">
                {({ field, meta }: FieldProps) => (
                  <UtilisationCalculatorMoleculeStep1TargetUtilisation
                    value={field.value}
                    onChange={(event: any) =>
                      setFieldValue(field.name, event.target.value)
                    }
                    name={field.name}
                    onBlur={field.onBlur}
                    error={!!(meta.touched && meta.error)}
                    helperText={meta.error}
                  />
                )}
              </Field>
            </div>
            <UtilisationCalculatorMoleculeStep1Buttons onClear={resetForm} />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export function UtilisationCalculatorResultOrganism({
  data,
  onClose,
}: UtilisationCalculatorResultOrganismProps) {
  if (!data) {
    return null;
  }

  const { t } = useTranslation();
  const meetsTarget = data.meetsTarget;
  const percentage = data.calculatedUtilisation;

  let status: string;
  let color: "success" | "error";
  let message: string;

  if (meetsTarget) {
    status = t("utilisationCalculator.results.statusTargetMet");
    color = "success";
    message = t("utilisationCalculator.results.messageSuccess");
  } else {
    status = t("utilisationCalculator.results.statusBelowTarget");
    color = "error";
    message = t("utilisationCalculator.results.messageWarning");
  }

  return (
    <div className="utilisation-calculator-organism-result-container">
      <UtilisationCalculatorMoleculeStep4Header onClose={onClose} />
      <div className="utilisation-calculator-organism-result-content">
        <UtilisationCalculatorMoleculeStep4LabeledProgressBar
          percentage={percentage}
          status={status}
          value={data.calculatedUtilisation}
          target={data.targetUtilisation}
          color={color}
        />
        <UtilisationCalculatorMoleculeStep4UtilisationSummaryCard
          message={message}
          messageColor={color}
          totalHours={data.totalHours}
          billableHours={data.billableHours}
          target={data.targetUtilisation}
        />
      </div>
    </div>
  );
}
