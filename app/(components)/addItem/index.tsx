"use client";

import AddIcon from "@mui/icons-material/Add";
import { Formik, FormikHelpers, FormikValues, useFormik } from "formik";
import { AddItemModal, ImageModal } from "@/app/models/contact.model";
import { useAddItemMutation } from "@/app/services/contactsApi";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as Yup from "yup";
import { toast } from "sonner";
import axios from "axios";

const initialValues: AddItemModal = {
  title: "",
  category: "",
  price: null,
  description: "",
  image: "",
};
const TodoSchema = Yup.object().shape({
  title: Yup.string().min(2, "Too Short!").max(70, "Too Long!").required(),
  category: Yup.string().min(3, "Too Short!").max(20, "Too Long!").required(),
  description: Yup.string()
    .min(10, "Too Short!")

    .required(),
  price: Yup.number().required(),
});

const AddItem = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [addItem] = useAddItemMutation();

  return (
    <div className=" container mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={TodoSchema}
        onSubmit={async (
          values: AddItemModal,
          actions: FormikHelpers<AddItemModal>
        ) => {
          const { image } = values;
          const formData = new FormData();

          try {
            formData.append("file", image);
            formData.append("upload_preset", "nrxeyjoa");
            const res = await axios.post(
              `https://api.cloudinary.com/v1_1/dgwwyemfa/image/upload`,
              formData
            );
            console.log("🚀 ~ AddItem ~ res:", res.data.secure_url);
            values.image = res.data.secure_url;
          } catch (error) {
            console.log("🚀 ~ AddItem ~ error:", error);
          }
          await addItem(values);
          toast.success("success ");
        }}
      >
        {({
          values,
          errors,
          resetForm,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <React.Fragment>
              <Button
                type="button"
                onClick={() => {
                  handleClickOpen(), resetForm();
                }}
                className="w-[160px]"
                variant="outlined"
                startIcon={<AddIcon />}
              >
                Add item
              </Button>

              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  component: "form",
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleClose();
                  },
                }}
              >
                <DialogTitle>create </DialogTitle>
                <DialogContentText className="px-6">
                  This form will help you create your to-do list items. Rest
                  assured, you{"'"}ll have the flexibility to edit or delete
                  them later as needed.{" "}
                </DialogContentText>
                <DialogContent>
                  <TextField
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.title}
                    margin="dense"
                    id="title"
                    name="title"
                    placeholder="Recipe Title"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  {errors.title && errors.title ? (
                    <div>{errors.title}</div>
                  ) : null}
                  <TextField
                    autoFocus
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.description}
                    margin="dense"
                    id="description"
                    name="description"
                    placeholder="description"
                    type="text"
                    fullWidth
                    variant="standard"
                  />{" "}
                  {errors.description && errors.description ? (
                    <div>{errors.description}</div>
                  ) : null}
                  <TextField
                    autoFocus
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.category}
                    margin="dense"
                    id="category"
                    name="category"
                    placeholder="what kind of category"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  {errors.category && errors.category ? (
                    <div>{errors.category}</div>
                  ) : null}
                  <TextField
                    autoFocus
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.price}
                    margin="dense"
                    id="price"
                    name="price"
                    placeholder="price "
                    type="number"
                    fullWidth
                    variant="standard"
                  />{" "}
                  {errors.price && errors.price ? (
                    <div>{errors.price}</div>
                  ) : null}
                  <TextField
                    autoFocus
                    required
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("image", event?.target?.files?.[0])
                    }
                    onBlur={handleBlur}
                    value={undefined}
                    margin="dense"
                    id="image"
                    name="image"
                    placeholder="upload image"
                    type="file"
                    fullWidth
                    variant="standard"
                  />{" "}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Create</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddItem;
