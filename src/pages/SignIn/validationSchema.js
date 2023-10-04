import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8, "Min length is 8 characters"),
  })
  .required();

export default schema;
