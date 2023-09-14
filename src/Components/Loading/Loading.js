import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-div">
      <div className="loading first-dot" />
      <div className="loading second-dot" />
      <div className="loading third-dot" />
      <h1 className="text-loading">Loading, please wait...</h1>
    </div>
  );
}
