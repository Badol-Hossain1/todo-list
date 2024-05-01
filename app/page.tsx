"use client";
import { useDispatch, useSelector } from "react-redux";
import Read from "./(components)/read";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useGetItemsQuery, useItemQuery } from "./services/contactsApi";
import AddItem from "./(components)/addItem";
import { Button, TextField } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

export default function Home() {
  const { data, error, isLoading, isFetching, isSuccess } = useGetItemsQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedCategory(e.target.value);
  };
  // Filtered data based on selected category
  const filteredData = selectedCategory
    ? data?.filter((item) => item.category === selectedCategory)
    : data;

  const handleSearch = () => {
    return data?.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <main className="container mx-auto">
      <h1 className="text-center text-4xl font-bold">Todo list</h1>
      {isLoading && (
        <h1 className="text-center text-4xl font-bold">...Loading</h1>
      )}
      {isFetching && (
        <h2 className="text-center text-4xl font-bold">...Fetching</h2>
      )}
      {error && (
        <h2 className="text-center text-4xl font-bold">something went wrong</h2>
      )}

      <AddItem />
      <br />

      <div className="flex  gap-4 items-center">
        <select
          className="border px-4 py-3"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {data &&
            Array.from(new Set(data.map((item) => item.category))).map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
        </select>
        <TextField
          autoFocus
          className="w-full"
          id="name"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Here"
          name="title"
          type="text"
          fullWidth
          variant="standard"
        />
        <Button
          type="button"
          onClick={() => {
            handleSearch();
          }}
          className="w-[160px]"
          variant="outlined"
          startIcon={<PersonSearchIcon />}
        >
          Search
        </Button>
      </div>

      {isSuccess && (
        <div className="container mt-6 mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredData &&
            filteredData
              .filter((item) => {
                return searchQuery.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(searchQuery);
              })
              .map((item) => (
                <div key={item.id}>
                  <Read key={item.id} data={item} />
                </div>
              ))}
        </div>
      )}
    </main>
  );
}
