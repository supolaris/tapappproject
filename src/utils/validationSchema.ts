import * as yup from "yup";

export const billingValidationSchema = yup.object().shape({
  FirstName: yup.string().required("First name is required"),
  MiddleName: yup.string().required("Middle name is required"),
  LastName: yup.string().required("Last name is required"),
  DOB: yup.string().required("Date of birth is required"),
  Country: yup.string().required("Country is required"),
  BillingAddress1: yup.string().required("Billing address 1 is required"),
  BillingAddress2: yup.string().required("Billing address 2 is required"),
  BillingCity: yup.string().required("Billing city is required"),
  BillingState: yup.string().required("Billing state is required"),
  BillingPincode: yup.string().required("Billing pin code is required"),
});
