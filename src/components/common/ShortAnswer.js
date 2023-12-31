import React,{useState} from "react";
import styled from "styled-components";
import Question from "../view/Question";
import { getTheme, useSelector } from '../../store';

const ShortAnswer = ({ input, inputIndex, formId, response }) => {
  const theme = useSelector(getTheme(formId))
  const [isFocused, setIsFocused] = useState('false')

  const style = {
    ...(isFocused && { outline: 'none', borderBottom: `1px solid ${theme}` }),
  }
  return (
    <Question
      question={input ? input.question : response.question}
      index={inputIndex}
      required={input ? input.required : response.required}
    >
      <Div>
        {input ? (
          <input
            type="text"
            name={inputIndex}
            placeholder="Your answer"
            style={style}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={input.required}
          />
        ) : (
          <input type="text" value={response.ans} disabled />
        )}
      </Div>
    </Question>
  );
};

const Div = styled.div`
  margin-left: 32px;
  margin-bottom: 24px;
  input {
    padding: 8px;
    width: 50%;
    border: none;
    border-bottom: 1px solid #9e9e9e;
  }
`;

export default ShortAnswer;
