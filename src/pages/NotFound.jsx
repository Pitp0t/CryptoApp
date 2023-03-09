import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col h-[60vh] justify-center items-center gap-5 text-center">
      <div>
        <h2 className="text-xl font-bold">Error 404</h2>
        <h2>Page not found</h2>
      </div>

      <NavLink to="/">
        <button className="btn gap-2">
          <box-icon color="#ffffff" name="left-arrow-circle"></box-icon>
          Go back
        </button>
      </NavLink>
    </div>
  );
}
