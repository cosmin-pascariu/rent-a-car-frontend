import React from "react";
import "./HomeCardInfo.css";

function HomeCardInfo({ title, count, onClick }) {
  return (
    <div className="home-card" onClick={onClick}>
      <h2>{title}</h2>
      <p>{count}</p>
    </div>
  );
}

export default HomeCardInfo;
