import FormTitle from "./FormTitle";
import InputTypeSelect from "./InputTypeSelect";
import Footer from "./Footer";
import styled from "styled-components";
import SideButton from "./SideButton";
import QuestionComponents from "./QuestionComponents";
import {
  ImRadioChecked,
  IoIosArrowDropdown,
  MdOutlineShortText,
  MdOutlineDateRange,
  MdOutlineCheckBox,
  BsTextParagraph,
  BiTimeFive,
} from "../../icons";

const iconStyle = {
  width: "24px",
  height: "24px",
  color: "#868686",
  position: "relative",
  top: "6px",
  paddingRight: "8px",
};

const types = {
  "multiple-choice": {
    title: "Multiple choice",
    icon: <ImRadioChecked style={iconStyle} />,
  },
  checkboxes: {
    title: "Checkboxes",
    icon: <MdOutlineCheckBox style={iconStyle} />,
  },
  dropdown: {
    title: "Drop-down",
    icon: <IoIosArrowDropdown style={iconStyle} />,
  },
  "short-answer": {
    title: "Short answer",
    icon: <MdOutlineShortText style={iconStyle} />,
  },
  paragraph: {
    title: "Paragraph",
    icon: <BsTextParagraph style={iconStyle} />,
  },
  date: { title: "Date", icon: <MdOutlineDateRange style={iconStyle} /> },
  time: { title: "Time", icon: <BiTimeFive style={iconStyle} /> },
};

const Input = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
`;

export {
  types,
  Input,
  Footer,
  FormTitle,
  InputTypeSelect,
  SideButton,
  QuestionComponents,
};
