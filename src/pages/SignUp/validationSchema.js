import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup.string().required().max(20, "Max length is 20 characters"),
    lastName: yup.string().required().max(20, "Max length is 20 characters"),
    email: yup.string().required().email(),
    password: yup.string().required().min(8, "Min length is 8 characters"),
  })
  .required();

export default schema;
