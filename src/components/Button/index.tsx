import { CustomButton } from "./styles";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color: "blue" | "yellow" | "grey";
  content: string;
  icon?: string;
  alt?: string;
  type?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <>
      <CustomButton {...props}>
        {" "}
        <i className="icon">
          <img src={props.icon} alt={props.alt} />
        </i>
        {props.content}
      </CustomButton>
    </>
  );
}
