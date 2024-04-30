"use client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import { Items } from "@/app/models/contact.model";
import {
  useAddItemMutation,
  useGetItemsQuery,
} from "@/app/services/contactsApi";

const AddItem = () => {
  const [items, setItems] = useState<Items>(Object);
  //   const { refetch } = useGetItemsQuery();

  const [addItem] = useAddItemMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // refetch();
    await addItem(items);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="grid container mx-auto gap-3">
        <TextField
          id="outlined-multiline-flexible"
          label="title"
          multiline
          value={items.name}
          name="title"
          onChange={handleChange}
          maxRows={4}
        />
        <TextField
          id="filled-multiline-static"
          label="doc"
          name="doc"
          value={items.dec}
          onChange={handleChange}
          multiline
          rows={4}
          variant="filled"
        />
        <Button
          type="submit"
          className="w-[160px]"
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Add item
        </Button>
      </form>
    </div>
  );
};

export default AddItem;
