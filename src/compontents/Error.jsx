import React from "react";

export default function Error({ error }) {
  return (
    <div className="flex flex-col  h-[60vh] justify-center items-center gap-5 text-center">
      <div>
        <h2 className="text-xl text-white font-bold">Error</h2>
        <h2 className="text-md text-white font-medium"> ERROR CON LA API COINGEKO</h2>
      </div>
      <h2 className="text-white">{error} :(</h2>
    </div>
  );
}
