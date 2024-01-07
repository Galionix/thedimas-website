import { FaCheck } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

export type Icon = "FaCircle" | "FaCheck" | "";

export const getIcon = (icon: Icon, index: number) => {
  switch (icon) {
    case "FaCheck":
      return <FaCheck />;
    default:
      return index % 2 === 0 ? <FaCircle /> : <FaRegCircle />;
  }
};
