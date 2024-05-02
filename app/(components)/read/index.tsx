"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  useDeleteItemMutation,
  useUpdateItemMutation,
} from "@/app/services/contactsApi";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AddItemModal } from "@/app/models/contact.model";

import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import { useFormikContext } from "formik";
import { useState } from "react";
import { toast } from "sonner";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Read = ({ data }: any) => {
  const [deleteItem] = useDeleteItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<AddItemModal>(data);
  const [showFullText, setShowFullText] = useState(false);
  const [category, setCategory] = React.useState("");
  const [title, setTitle] = React.useState<string>("");

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    maxLength: number
  ) => {
    const inputValue = e.target.value;
    // Check if input length exceeds the maxLength
    if (inputValue.length <= maxLength) {
      setState(inputValue);
      handleChange(e); // Update the state of the input field in the items object
    }
  };

  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  // update data
  const handleUpdateItem = async () => {
    await updateItem(items);
    toast.success("Item updated successfully!"); // Show toast message
    handleClose();
  };
  // delete

  const handleDeleteItem = async () => {
    await deleteItem(data?.id);
    toast.error("Item deleted successfully!"); // Show error toast message
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  const isAnyFieldEmpty = Object.values(items).some(
    (val) => String(val).trim() === ""
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        className="w-[90%] xl:w-full xl:container  mx-auto"
        sx={{ maxWidth: 300 }}
      >
        <CardMedia
          className="h-[200px]"
          component="img"
          alt="green iguana"
          height="140"
          image={data?.image}
        />
        <CardContent>
          <Typography
            className="flex flex-col  justify-between"
            gutterBottom
            variant="h5"
            component="div"
          >
            <span className="uppercase text-xl"> {data?.title}</span>

            <div className="uppercase text-xl mt-2"> price: {data?.price}$</div>
          </Typography>
          <span className="uppercase"> {data?.category}</span>

          <Typography
            className="pt-2 h-[70px] overflow-y-scroll scrollbar-hide"
            variant="body2"
            color="text.secondary"
          >
            {showFullText ? data.description : data.description.slice(0, 100)}
            {!showFullText && data.description.length > 100 && (
              <span
                onClick={toggleShowMore}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {" "}
                Show more
              </span>
            )}
          </Typography>
        </CardContent>
        <CardActions className="flex justify-between">
          <Button onClick={handleClickOpen} size="small">
            Edit
          </Button>
          <Button onClick={handleDeleteItem} size="small">
            Delete
          </Button>
        </CardActions>
      </Card>

      <React.Fragment>
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
          <DialogTitle>Update</DialogTitle>
          <DialogContent>
            title
            <TextField
              autoFocus
              className="w-full"
              value={items?.title}
              id="name"
              placeholder="title"
              name="title"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(e, setTitle, 20)
              }
              fullWidth
              error={title.length > 20} // Show error if length exceeds 10 characters
              helperText={
                title.length > 20
                  ? "title must be at most 10 characters long"
                  : ""
              }
              variant="standard"
            />
            description
            <TextField
              autoFocus
              className="w-full "
              value={items?.description}
              id="name"
              onChange={handleChange}
              placeholder="description"
              name="description"
              type="text"
              fullWidth
              variant="standard"
              maxRows={4}
            />
            category
            <TextField
              autoFocus
              className="w-full"
              value={items?.category}
              id="category"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(e, setCategory, 20)
              }
              placeholder="category"
              name="category"
              type="text"
              fullWidth
              error={category.length > 20} // Show error if length exceeds 10 characters
              helperText={
                category.length > 20
                  ? "Category must be at most 10 characters long"
                  : ""
              }
              variant="standard"
            />
            price
            <TextField
              autoFocus
              className="w-full"
              value={items?.price}
              id="price"
              onChange={handleChange}
              placeholder="price"
              name="price"
              type="number"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              disabled={isAnyFieldEmpty}
              onClick={handleUpdateItem}
              type="submit"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default Read;
