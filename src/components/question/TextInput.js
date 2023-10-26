import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import QuestionLayout from "../layouts/QuestionLayout";
import { infoActions } from "../../store/infoSlice";

const TextInput = ({ input, inputIndex, formId }) => {
  const dispatch = useDispatch();
  const editQuestionIndex = useSelector(
    (state) => state.info.editQuestionIndex
  );

  let placeholder =
    input.type === "paragraph" ? "Long-answer text" : "Short-answer text";
  let width = input.type === "paragraph" ? "90%" : "50%";

  const handleClick = (e) => {
    e.stopPropagation();

    if (editQuestionIndex !== inputIndex) {
      dispatch(infoActions.setEditQuestionIndex({ inputIndex }));
    }
  };

  return (
    <QuestionLayout
      input={input}
      inputIndex={inputIndex}
      formId={formId}
      handleClick={handleClick}
      focus="question"
    >
      <Div style={{ width: width }}>
        <div
          className={
            editQuestionIndex === inputIndex ? "placeholderA" : "placeholderB"
          }
        >
          {placeholder}
        </div>
      </Div>
    </QuestionLayout>
  );
};

const Div = styled.div`
  .placeholderA {
    color: #70757a;
    margin: 32px 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #9e9e9e;
  }
  .placeholderB {
    color: #70757a;
    margin: 0px 32px;
    padding-bottom: 8px;
    border-bottom: 1px solid #9e9e9e;
  }
`;

export default TextInput;
