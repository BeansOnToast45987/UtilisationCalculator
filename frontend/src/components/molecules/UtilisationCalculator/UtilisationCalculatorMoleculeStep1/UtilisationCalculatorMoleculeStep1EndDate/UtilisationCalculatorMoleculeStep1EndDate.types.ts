export interface UtilisationCalculatorMoleculeStep1EndDateProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  name: string;
  onBlur?: (e: any) => void;
  error?: boolean;
  helperText?: string;
}
