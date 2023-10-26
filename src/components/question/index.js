import FormTitle from "./FormTitle";
import InputTypeSelect from "./InputTypeSelect";
import MultipleOptionInput from "./MultipleOptionInput";
import Footer from "./Footer";
import styled from "styled-components";
import TextInput from "./TextInput";
import DateTimeInput from "./DateTimeInput";

const Input = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
`;

export {
  Input,
  Footer,
  FormTitle,
  InputTypeSelect,
  MultipleOptionInput,
  TextInput,
  DateTimeInput,
};
