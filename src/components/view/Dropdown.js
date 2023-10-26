import React from "react";
import styled from "styled-components";
import Question from "./Question";

const Dropdown = ({ input, inputIndex, formId, response }) => {
  return (
    <Question
      question={input ? input.question : response.question}
      index={inputIndex}
      required={input ? input.required : response.required}
    >
      <Div>
        {input ? (
          <select name={inputIndex} required={input.required}>
            <option value="">Choose</option>
            {input.options.map((option, ind) => (
              <option key={ind} className="option" value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <select disabled>
            <option className="option">{response.ans}</option>
          </select>
        )}
      </Div>
    </Question>
  );
};

const Div = styled.div`
  margin-left: 32px;
  margin-bottom: 24px;
  select {
    width: 176px;
    height: 48px;
    padding: 16px;
  }
  .option {
    width: 176px;
    height: 48px;
    padding: 16px;
  }
`;

export default Dropdown;
