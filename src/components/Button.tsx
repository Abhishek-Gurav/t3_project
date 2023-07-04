import { FC } from "react";
import { Button } from "react-bootstrap";
import buttonStyles from "../styles/button.module.css";

interface Props {
  text: string;
  cls: string;
  link: string;
  vari?: "primary" | "secondary" | "success" | "warning" | "danger" | "dark" | "";
}

const Btn: FC<Props> = ({ text, cls, link, vari = "" }): JSX.Element => {
  console.log("vari" + vari);
  return (
    <Button variant="outline-dark" size="lg">
      {text}
    </Button>
  );
};

export default Btn;