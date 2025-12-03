"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error;
}

const NoteDetailsError = ({ error }: ErrorProps) => {
  return (
    <>
      <h1>{error?.name}</h1>
      <h3>{error?.message}</h3>
      <Link className="backBtn" href={`/notes`}>
        <span className="backBtnSpan">←</span> Go back
      </Link>
    </>
  );
};

export default NoteDetailsError;
