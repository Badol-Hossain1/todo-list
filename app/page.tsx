"use client";
import { useDispatch, useSelector } from "react-redux";
import Read from "./(components)/read";
import { useState } from "react";

import { useGetItemsQuery } from "./services/contactsApi";

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
      {isSuccess && (
        <div className="grid grid-cols-4 gap-3">
          {data.map((item) => (
            <Read key={item.id} data={item} />
          ))}
        </div>
      )}
    </main>
  );
}
