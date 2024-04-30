import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Read = ({ data }: any) => {
  console.log("🚀 ~ Read ~ data:", data);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {data.title}
        </Typography>

        <Typography variant="body2">
          {data.doc}
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between">
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Read;
