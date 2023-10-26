import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import QuestionLayout from "../layouts/QuestionLayout";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";
import { infoActions } from "../../store/infoSlice";

const DateTimeInput = ({ input, inputIndex, formId }) => {
  const dispatch = useDispatch();

  const editQuestionIndex = useSelector(
    (state) => state.info.editQuestionIndex
  );

  let placeholder = input.type === "date" ? "Day-Month-Year" : "Time";
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
      <Div>
        <div
          className={
            editQuestionIndex === inputIndex ? "placeholderA" : "placeholderB"
          }
        >
          {placeholder} {icon}
        </div>
      </Div>
    </QuestionLayout>
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
