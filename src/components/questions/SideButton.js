import React from "react";
import { BiPlusCircle } from "../../icons";
import styled from "styled-components";
import {
  createInput,
  setEditQuestionIndex,
  useSelector,
  useDispatch,
  getEditQuestionIndex,
  getTop
} from "../../store";

const SideButton = ({ theme, formId }) => {
  const dispatch = useDispatch();
  let editQuestionIndex = useSelector(getEditQuestionIndex());
  let top = useSelector(getTop());

  const addQuestion = () => {
    dispatch(createInput({ formId: formId, editQuestionIndex }));
    dispatch(setEditQuestionIndex({ inputIndex: editQuestionIndex + 1 }));
  };

  return (
    <Button
      style={{ position: "absolute", top: `${top}px` }}
      onClick={(e) => addQuestion(e)}
    >
      <BiPlusCircle
        style={{
          width: "40px",
          height: "40px",
          color: theme,
          paddingTop: "5px",
        }}
      />
    </Button>
  );
};

const Button = styled.div`
  right: 340px;
  width: 50px;
  height: 50px;
  background-color: white;
  text-align: center;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
`;

export default SideButton;
