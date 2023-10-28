import React from "react";
import styled from "styled-components";
import QuestionContainer from "./QuestionContainer";
import { BiTimeFive, MdOutlineDateRange } from "../../icons";
import { getEditQuestionIndex, setEditQuestionIndex, useDispatch, useSelector } from "../../store";

const DateTimeInput = ({ input, inputIndex, formId }) => {
  const dispatch = useDispatch();

  const editQuestionIndex = useSelector(getEditQuestionIndex());

  let placeholder = input.type === "date" ? "Day-Month-Year" : "Time";
  let className =
    editQuestionIndex === inputIndex ? "placeholderA" : "placeholderB";
  let iconStyle = {
    width: "24px",
    height: "24px",
    color: "#868686",
    position: "relative",
    top: "10px",
  };
  let icon =
    input.type === "date" ? (
      <MdOutlineDateRange style={{ ...iconStyle, left: "100px" }} />
    ) : (
      <BiTimeFive style={{ ...iconStyle, left: "180px" }} />
    );

  const handleClick = (e) => {
    e.stopPropagation();

    if (editQuestionIndex !== inputIndex) {
      dispatch(setEditQuestionIndex({ inputIndex }));
    }
  };

  return (
    <QuestionContainer
      input={input}
      inputIndex={inputIndex}
      formId={formId}
      handleClick={handleClick}
      focus="question"
    >
      <Div>
        <div className={className}>
          {placeholder} {icon}
        </div>
      </Div>
    </QuestionContainer>
  );
};

const Div = styled.div`
  width: 250px;
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

export default DateTimeInput;
