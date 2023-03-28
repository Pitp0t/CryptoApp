import React from "react";

export default function Loading() {
  return (
    <div className="  flex flex-col h-[60vh] justify-center items-center gap-5 text-center">
      <div>
        <h2 className="text-xl font-bold text-white">Loading</h2>
      </div>
      <button className="btn bg-[#faa018] border-none rounded-full btn-square loading"></button>
    </div>
  );
}
