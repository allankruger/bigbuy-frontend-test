import { Button } from "./styles";
import { EyeIcon, TimesIcon } from "../../assets";

interface TableActionButtonProps {
  type: "edit" | "delete";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  alt: string;
  employeeId?: number;
}

export default function TableActionButton(props: TableActionButtonProps) {
  return (
    <>
      <Button {...props}>
        <i className="icon">
          <img
            src={props.type === "edit" ? EyeIcon : TimesIcon}
            alt={props.alt}
          />
        </i>
      </Button>
    </>
  );
}
