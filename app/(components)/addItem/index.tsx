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

import { toast } from "sonner";
import axios from "axios";
import { TodoSchema } from "../schemas";

import { MoonLoader } from "react-spinners";

const initialValues: AddItemModal = {
  title: "",
  category: "",
  price: null,
  description: "",
  image: "",
};

const AddItem = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [addItem] = useAddItemMutation();

  return (
    <div className="w-full">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-300 bg-opacity-75 z-50">
          <div className="text-center">
            <MoonLoader color="#36d7b7" />
          </div>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={TodoSchema}
        onSubmit={async (
          values: AddItemModal,
          actions: FormikHelpers<AddItemModal>
        ) => {
          const { image }: any = values;
          const formData = new FormData();
          setLoading(true);

          try {
            formData.append("file", image);
            formData.append("upload_preset", "nrxeyjoa");
            const res = await axios.post(
              `https://api.cloudinary.com/v1_1/dgwwyemfa/image/upload`,
              formData
            );

            values.image = res.data.secure_url;
          } catch (error) {
            console.log("🚀 ~ AddItem ~ error:", error);
          }
          await addItem(values);
          setLoading(false);
          toast.success("create data successfully ");
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
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <React.Fragment>
              <div className="flex  justify-between    items-center">
                <Button
                  type="button"
                  onClick={() => {
                    handleClickOpen(), resetForm();
                  }}
                  className="md:w-[160px] h-full"
                  variant="outlined"
                  startIcon={<AddIcon />}
                >
                  Add item
                </Button>

                <span className="font-bold md:text-2xl  text-blue-500">
                  {" "}
                  FoodDash
                </span>
              </div>

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
                  <Button disabled={!isValid} type="submit">
                    Create
                  </Button>
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
