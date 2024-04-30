"use client";
import { useDispatch, useSelector } from "react-redux";
import Read from "./(components)/read";
import { useState } from "react";

import { useGetItemsQuery, useItemQuery } from "./services/contactsApi";
import AddItem from "./(components)/addItem";

export default function Home() {
  const { data, error, isLoading, isFetching, isSuccess } = useGetItemsQuery();
  console.log("🚀 ~ Home ~ data:", data);
  const [form, setFrom] = useState({
    title: "",
    dec: "",
  });

  return (
    <main className="">
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
      {isSuccess && (
        <div className="container mx-auto grid grid-cols-4 gap-3">
          {data.map((item) => {
            return (
              <div key={item.id}>
                <Read key={item.id} data={item} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
