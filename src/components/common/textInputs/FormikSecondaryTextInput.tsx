import { useField, useFormikContext } from "formik";
import SecondaryTextInput from "./SecondaryTextInput";
import { TapAppColors } from "../../../constants/TapAppColors";

interface FormikSecondaryTextInputProps {
  name: string;
  label: string;
  keyboardType?: any;
  height?: number;
  isMultiLine?: boolean;
  numberOfLines?: number;
}

const FormikSecondaryTextInput = ({
  name,
  label,
  keyboardType,
  height,
  isMultiLine,
  numberOfLines,
}: FormikSecondaryTextInputProps) => {
  const [field, meta] = useField(name);
  const { submitCount } = useFormikContext();

  // Show error if field was touched OR if form was submitted (submitCount > 0)
  const showError = meta.touched || submitCount > 0;

  return (
    <SecondaryTextInput
      label={label}
      value={field.value}
      keyboardType={keyboardType}
      height={height}
      isMultiLine={isMultiLine}
      numberOfLines={numberOfLines}
      borderColor={
        showError && meta.error
          ? TapAppColors.primaryColor
          : TapAppColors.black
      }
      onBlur={() => {
        field.onBlur({ target: { name } });
      }}
      onChangeText={field.onChange(name)}
    />
  );
};

export default FormikSecondaryTextInput;
