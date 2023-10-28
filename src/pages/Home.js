import React from "react";
import { Header, NewForm, RecentForms } from "../components/home";


const Home = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <NewForm />
      <RecentForms />
    </div>
  );
};

export default Home;
