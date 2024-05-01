"use client";
// import { Button, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Formik, FormikHelpers, FormikValues, useFormik } from "formik";

import { AddItemModal } from "@/app/models/contact.model";
import {
  useAddItemMutation,
  useGetItemsQuery,
} from "@/app/services/contactsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { title } from "process";
import { Toaster } from "sonner";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as Yup from "yup";

const initialValues: AddItemModal = {
  title: "",
  category: "",
  price: null,
  description: "",
};
const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});

const AddItem = () => {
  const [item, setItem] = useState<any>(initialValues);
  console.log("🚀 ~ AddItem ~ item:", item);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [addItem] = useAddItemMutation();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setItem({ ...item, [e.target.name]: e.target.value });
  // };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // refetch();
  //   await addItem(item);
  //   setItem({
  //     title: "",
  //     doc: "",
  //     id: "",
  //   });
  //   toast("This is a sonner toast");
  // };

  // const { values, handleBlur, handleChange, handleSubmit, handleReset } =
  //   useFormik({
  //     initialValues: initialValues,
  //     onSubmit: (values) => {
  //       console.log("🚀 ~ AddItem ~ values:", values);
  //     },
  //   });

  return (
    <div className=" container mx-auto">
      <Toaster position="top-right" />
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={async (
          values: AddItemModal,
          actions: FormikHelpers<AddItemModal>
        ) => {
          addItem(values);
          setItem(values);
        }}
      >
        {({
          values,
          touched,
          errors,
          resetForm,
          handleBlur,
          handleChange,
          handleSubmit,
          handleReset,
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
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(
                      (formData as any).entries()
                    );
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                  },
                }}
              >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                  </DialogContentText>
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
