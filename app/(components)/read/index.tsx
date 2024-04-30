import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDeleteItemMutation } from "@/app/services/contactsApi";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  const [open, setOpen] = React.useState(false);

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
            {data.title}
          </Typography>

          <Typography variant="body2">{data.doc}</Typography>
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
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogTitle>Update</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              className="w-full"
              value={data.title}
              id="name"
              placeholder="title"
              name="title"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              className="w-full"
              value={data.title}
              id="name"
              placeholder="doc"
              name="doc"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default Read;
