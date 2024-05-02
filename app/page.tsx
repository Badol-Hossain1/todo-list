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
    <main className=" w-full mt-12 md:container  xl:w-full mx-auto">
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

      {/* <div className="flex flex-wrap px-4 w-full  container mx-auto gap-4 md:items-center">
        <div>
          <select
            className="border  md:px-4 text-xs md:py-3"
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
        </div>
        <div>
          <TextField
            autoFocus
            className=""
            id="name"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Here"
            name="title"
            type="text"
            fullWidth
            variant="standard"
            InputProps={{
              endAdornment: <PersonSearchIcon />,
            }}
          />
        </div>
      </div> */}

      <div className="flex md:justify-between  justify-center gap-4   items-center">
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
        <span className="font-bold text-2xl  text-blue-500">
          {" "}
          <TextField
            autoFocus
            className=""
            id="name"
            onChange={(e) => setSearchQuery(e.target.value)}
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
        <div className="container mt-6 mx-auto grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
