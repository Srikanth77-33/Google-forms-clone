import React from "react";
import styled from "styled-components";

const Question = ({ index, question = "", required, children }) => {
  return (
    <Div key={index}>
      <div className="question">
        {question}
        <span style={{ color: "red" }}>{required && "*"}</span>
      </div>
      {children}
    </Div>
  );
};

const Div = styled.div`
  margin-top: 16px;
  min-height: 128px;
  width: 624px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 0 2px #d9d9d9;
  .question {
    padding: 24px 16px 8px 32px;
    font-size: 18px;
  }
`;

export default Question;
