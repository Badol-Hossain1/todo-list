"use client";
import { useDispatch, useSelector } from "react-redux";
import Read from "./(components)/read";
import { useState } from "react";
import { useGetTodoQuery } from "./(components)/test/text";
import { useGetItemsQuery } from "./services/contactsApi";

export default function Home() {
  const { data } = useGetItemsQuery();
  console.log("🚀 ~ Home ~ data:", data);
  const [form, setFrom] = useState({
    title: "",
    dec: "",
  });

  return (
    <main className="">
      {/* <form onSubmit={onSubmit} action="">
        <input
          className="border"
          name="title"
          value={form.title}
          onChange={onChangeHandler}
          type="text"
        />
        <input
          className="border"
          name="dec"
          value={form.dec}
          onChange={onChangeHandler}
          type="text"
        />
        <button type="submit" className="">
          add me
        </button>
      </form> */}
      <Read />
    </main>
  );
}
