"use client";

import Loader from "@/components/Loader/Loader";

const loading = () => {
  return (
    <div>
      <Loader />
      <p>Loading, please wait...</p>
    </div>
  );
};

export default loading;
