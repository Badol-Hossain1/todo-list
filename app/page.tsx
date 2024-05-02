"use client";
import { useDispatch, useSelector } from "react-redux";
import Read from "./(components)/read";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useGetItemsQuery, useItemQuery } from "./services/contactsApi";
import AddItem from "./(components)/addItem";
import { Button, TextField } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Toaster } from "sonner";

export default function Home() {
  const { data, error, isLoading, isFetching, isSuccess } = useGetItemsQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  console.log("🚀 ~ Home ~ searchQuery:", searchQuery);

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedCategory(e.target.value);
  };
  // Filtered data based on selected category
  const filteredData = selectedCategory
    ? data?.filter((item) => item.category === selectedCategory)
    : data;

  return (
    <main className="  mt-12 ">
      <Toaster richColors />

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

      <div className="grid w-[88%] xl:w-full xl:container mx-auto">
        <div className="flex justify-around md:justify-between">
          <select
            className="border px-4 text-xs py-3"
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
          <div className="font-bold md:text-2xl  text-blue-500">
            total item {data?.length}
          </div>
        </div>
        <span className="font-bold w-[90%] md:w-full mx-auto mt-4 text-2xl  text-blue-500">
          {" "}
          <TextField
            autoFocus
            className="md:w-full "
            id="name"
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            placeholder="Search Here"
            name="title"
            type="text"
            fullWidth
            variant="standard"
            InputProps={{
              endAdornment: <PersonSearchIcon />,
            }}
          />
        </span>
      </div>

      {isSuccess && (
        <div className="xl:container w-[90%] xl:w-full mt-6 mx-auto grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
