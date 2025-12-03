"use client";
import css from "./Notes.module.css";
interface ErrorHandlerProp {
  error: Error;
  reset: () => void;
}
const ErrorHandler = ({ error, reset }: ErrorHandlerProp) => {
  return (
    <div>
      <h3>Could not fetch the list of notes 🥲 </h3>
      <p>{error.message}</p>
      <button className={css.button} onClick={reset}>
        Try again
      </button>
    </div>
  );
};

export default ErrorHandler;
