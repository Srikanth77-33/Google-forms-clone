import React, { useState } from "react";
import styled from "styled-components";
import Question from "./Question";

const CheckBoxes = ({ input, inputIndex, formId, response }) => {
  const [checked, setChecked] = useState(input?.options.map(() => false));
  const [required, setRequired] = useState(input?.required);

  const handleOnChange = (e, ind) => {
    setChecked((state) => {
      let newArr = [...state];
      newArr[ind] = e.target.checked;

      if (input.required) {
        if (newArr.find((item) => item === true)) {
          setRequired(false);
        } else {
          setRequired(true);
        }
      }

      return newArr;
    });
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
              type="checkbox"
              value={option}
              name={`${inputIndex}${ind}`}
              readOnly={input ? false : true}
              checked={input ? checked[ind] : option.value}
              required={required}
              onChange={(e) => handleOnChange(e, ind)}
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
  margin-bottom: 24px;
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

export default CheckBoxes;
