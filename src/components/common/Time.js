import React,{ useState} from "react";
import styled from "styled-components";
import Question from "../view/Question";
import { getTheme, useSelector } from '../../store';

const Time = ({ input, inputIndex, formId, response }) => {
  const theme = useSelector(getTheme(formId));
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
            type="Time"
            name={inputIndex}
            placeholder="Your answer"
            required={input.required}
            style={style}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        ) : (
          <input type="Time" value={response.ans} disabled  />
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
    border: none;
    border-bottom: 1px solid #9e9e9e;
  }
`;

export default Time;
