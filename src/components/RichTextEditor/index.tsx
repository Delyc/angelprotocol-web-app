import { ErrorMessage } from "@hookform/error-message";
import "quill/dist/quill.bubble.css";
import { FieldValues, Path, useController } from "react-hook-form";
import RichText, { EditorClasses } from "./RichText";

export default function RichTextEditor<T extends FieldValues>(props: {
  fieldName: Path<T>;
  classes?: EditorClasses & { error?: string };
  placeHolder?: string;
}) {
  const {
    formState: { errors },
    field: { value, onChange },
  } = useController<T>({ name: props.fieldName });

  return (
    <>
      <RichText
        content={value}
        onChange={onChange}
        placeHolder={props.placeHolder || ""}
        classes={props.classes}
      />
      <ErrorMessage
        errors={errors}
        name={props.fieldName as any}
        as="p"
        className={props.classes?.error}
      />
    </>
  );
}