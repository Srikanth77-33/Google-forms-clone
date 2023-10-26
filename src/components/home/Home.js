import React from "react";
import { Header } from "./Header";
import NewForm from "./NewForm";
import { RecentForms } from "./RecentForms";

export const Home = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <NewForm />
      <RecentForms />
    </div>
  );
};
