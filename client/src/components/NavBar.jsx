import React from "react";
import { Link } from "react-router-dom";
import style from "../Styles/nav.module.css";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const { topnav } = style;

  return (
    <div className={topnav}>
      <Link to="/home">Home</Link>
      <Link to="/create-activity">Create Activities</Link>
      <Link to="/all/activities">See All Activities</Link>
      <SearchBar></SearchBar>
    </div>
  );
}
