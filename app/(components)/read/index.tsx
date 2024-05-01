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

import CardMedia from "@mui/material/CardMedia";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };
  const isAnyFieldEmpty = Object.values(items).some(
    (val) => String(val).trim() === ""
  );

  const isDisabled = isAnyFieldEmpty;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <CardContent>
          <Typography
            className="flex justify-between"
            gutterBottom
            variant="h5"
            component="div"
          >
            <span className="uppercase"> {data?.title}</span>
            <div className="uppercase"> price: {data?.price}$</div>
          </Typography>
          <span className="uppercase"> {data?.category}</span>

          {data?.description && data.description.length > 100 ? (
            <Typography
              className="pt-2 h-[200px] overflow-y-scroll scrollbar-hide"
              variant="body2"
              color="text.secondary"
            >
              {data.description}
            </Typography>
          ) : (
            <Typography className="pt-2" variant="body2" color="text.secondary">
              {data.description}
            </Typography>
          )}
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
            title
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
            description
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
              maxRows={4}
            />
            category
            <TextField
              autoFocus
              className="w-full"
              value={items?.category}
              id="category"
              onChange={handleChange}
              placeholder="category"
              name="category"
              type="text"
              fullWidth
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
              disabled={isDisabled}
              onClick={() => updateItem(items)}
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
