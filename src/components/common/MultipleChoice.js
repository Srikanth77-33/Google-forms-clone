import React, { useState } from "react";
import styled from "styled-components";
import Question from "../view/Question";

const MultipleChoice = ({ input, inputIndex, response }) => {
  const [checked, setChecked] = useState(-1);
  const [required, setRequired] = useState(input?.required);

  const handleOnChange = (ind) => {
    setChecked(ind);
    if (required === true) {
      setRequired(false);
    }
  };

  return (
    <Question
      question={input ? input.question : response.question}
      index={inputIndex}
      required={input ? input.required : response.required}
    >
      <Div>
        {(input ? input.options : response.ans).map((option, ind) => (
          <label key={ind}>
            <input
              type="radio"
              value={option}
              name={`${inputIndex}${ind}`}
              disabled={input ? false : true}
              checked={input ? checked === ind : option.value}
              required={required}
              onChange={() => handleOnChange(ind)}
            />
            <span>{input ? option : option.option}</span>
          </label>
        ))}
      </Div>
    </Question>
  );
};

const Div = styled.div`
  margin-left: 32px;
  padding-bottom: 24px;
  input {
    width: 20px;
    height: 20px;
    position: relative;
    top: 4px;
  }
  span {
    margin-left: 8px;
  }
  label {
    display: block;
    padding: 8px;
  }
`;

export default MultipleChoice;
