import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Footer, InputTypeSelect, Input } from ".";
import {
  setTop,
  useDispatch,
  useSelector,
  updateQuestion,
  getEditQuestionIndex,
  getTheme,
} from "../../store";

const QuestionContainer = ({
  input,
  inputIndex,
  formId,
  children,
  handleClick,
  focus,
}) => {
  const editQuestionIndex = useSelector(getEditQuestionIndex());
  const theme = useSelector(getTheme(formId));
  const componentRef = useRef();
  const questionRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (editQuestionIndex === inputIndex) {
      if (focus === "question" && questionRef.current) {
        questionRef.current.focus();
      }
    }
  }, [focus, questionRef, editQuestionIndex, inputIndex]);

  useEffect(() => {
    if (componentRef.current && editQuestionIndex === inputIndex) {
      dispatch(setTop({ top: Math.floor(componentRef.current.offsetTop) }));
    }
  }, [editQuestionIndex, dispatch, inputIndex]);

  const handleUpdateQuestion = (question) => {
    dispatch(updateQuestion({ formId, inputIndex, question }));
  };

  const handleOnClick = (e, focus) => {
    handleClick(e, focus);
  };

  const handleFocus = () => {
    if (questionRef && questionRef.current) {
      questionRef.current.style.borderBottom = `2px solid ${theme}`;
    }
  };
  const handleBlur = () => {
    if (questionRef && questionRef.current) {
      questionRef.current.style.borderBottom = `1px solid #9e9e9e`;
    }
  };

  if (editQuestionIndex === inputIndex) {
    return (
      <StyledDiv key={inputIndex} ref={componentRef}>
        <div className="top">
          <Input
            ref={questionRef}
            type="text"
            className="question"
            value={input.question}
            placeholder="Question"
            onFocus={() => handleFocus()}
            onBlur={() => handleBlur()}
            onChange={(e) => handleUpdateQuestion(e.target.value)}
          />
          <InputTypeSelect inputIndex={inputIndex} inputType={input.type} />
        </div>
        {children}
        <Footer
          required={input.required}
          inputIndex={inputIndex}
          formId={formId}
          editQuestionIndex={editQuestionIndex}
        />
      </StyledDiv>
    );
  } else {
    return (
      <Div
        key={inputIndex}
        ref={componentRef}
        onClick={(e) => handleOnClick(e, "question")}
      >
        <div className="question">
          {input.question ? input.question : "question"}
        </div>
        {children}
      </Div>
    );
  }
};

const StyledDiv = styled.div`
  transition: all 0.5s ease;
  margin-top: 16px;
  width: 624px;
  border-left: 5px solid #4285f4;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 0 2px #d9d9d9;
  .top {
    margin-top: 16px;
    display: flex;
    justify-content: space-around;
  }
  .question {
    border-bottom: 1px solid #9e9e9e;
    width: 300px;
    height: 50px;
    background-color: #efefef;
    padding-left: 16px;
  }
`;

const Div = styled.div`
  transition: all 0.5s ease;
  margin-top: 16px;
  min-height: 128px;
  width: 624px;
  border-radius: 4px;
  box-shadow: 0 0 0 2px #d9d9d9;
  background-color: white;
  .question {
    margin: 24px 16px 16px 32px;
  }
`;

export default QuestionContainer;
