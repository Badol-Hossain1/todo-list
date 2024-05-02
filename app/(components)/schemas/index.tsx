import * as Yup from "yup";

export const TodoSchema = Yup.object().shape({
  title: Yup.string().min(2, "Too Short!").max(20, "Too Long!").required(),
  category: Yup.string().min(3, "Too Short!").max(20, "Too Long!").required(),
  description: Yup.string()
    .min(10, "Too Short!")

    .required(),
  price: Yup.number().required(),
});
