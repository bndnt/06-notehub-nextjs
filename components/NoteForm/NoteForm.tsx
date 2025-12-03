import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { createNote } from "@/lib/api";
interface NoteFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}
interface NoteFormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
const INITIAL_VALUES: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};
const NotesSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Type at least 3 symbols")
    .max(50, "Title limit is 50 symbols")
    .required("Title is required"),
  content: Yup.string().max(500, "Content limit is 500 symbols."),
  tag: Yup.string()
    .oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Tag is not valid"
    )
    .required("Tag field is required"),
});
const NoteForm = ({ onClose, onSuccess }: NoteFormProps) => {
  const QueryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
  });

  const handleSubmit = (
    values: NoteFormValues,
    helpers: FormikHelpers<NoteFormValues>
  ) => {
    mutate(values, {
      onSuccess: () => {
        QueryClient.invalidateQueries({ queryKey: ["notes"] });
        helpers.resetForm();
        onSuccess?.(); // якщо передано
        onClose(); // завжди закриваємо форму після успішного створення
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={NotesSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <span className={css.error}>
            <ErrorMessage name="title" />
          </span>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <span className={css.error}>
            <ErrorMessage name="content" />
          </span>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <span className={css.error}>
            <ErrorMessage name="tag" />
          </span>
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
