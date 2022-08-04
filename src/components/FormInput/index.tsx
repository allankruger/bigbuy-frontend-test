import { HTMLInputTypeAttribute } from "react";
import "./styles.css";

interface FormInputProps {
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  value?: HTMLInputTypeAttribute;
  onChange?: HTMLInputTypeAttribute;
}

export default function FormInput(props: FormInputProps) {
  return (
    <div>
      <input
        className="formInput"
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
}
