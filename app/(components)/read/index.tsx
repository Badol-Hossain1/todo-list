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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddItemModal } from "@/app/models/contact.model";

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
  console.log("🚀 ~ Read ~ items:", items);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card className="container" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {data?.title}
          </Typography>

          <Typography variant="body2">{data?.description}</Typography>
        </CardContent>
        <CardActions className="flex justify-between">
          <Button onClick={handleClickOpen} size="small">
            Edit
          </Button>
          <Button onClick={() => deleteItem(data?.id)} size="small">
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
            <TextField
              autoFocus
              className="w-full"
              value={items?.title}
              id="name"
              placeholder="title"
              name="title"
              type="text"
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              className="w-full"
              value={items?.description}
              id="name"
              onChange={handleChange}
              placeholder="description"
              name="description"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => updateItem(items)} type="submit">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default Read;
