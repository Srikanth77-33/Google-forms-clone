import React, { useState } from "react";
import styled from "styled-components";
import Question from "./Question";
import { useSelector } from "react-redux";

const LongAnswer = ({ input, inputIndex, formId, response }) => {
  const [rows, setRows] = useState(1);
  const theme = useSelector((state) => state.forms.find((item) => item.id === formId).theme)
  const [isFocused, setIsFocused] = useState('false')

  const style = {
    ...(isFocused && { outline: 'none', borderBottom: `1px solid ${theme}` }),
  }

  const handleChange = (e) => {
    if (Math.ceil(e.target.value.length / 70) > rows && rows <= 10) {
      setRows(Math.ceil(e.target.value.length / 70));
    }
  };

  return (
    <Question
      question={input ? input.question : response.question}
      index={inputIndex}
      required={input ? input.required : response.required}
    >
      <Div>
        {input ? (
          <textarea
            name={inputIndex}
            placeholder="Your answer"
            required={input.required}
            rows={rows}
            style={style}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => handleChange(e)}
          />
        ) : (
          <textarea
            value={response.ans}
            readOnly
            rows={Math.ceil(response.ans.length / 70)}
          />
        )}
      </Div>
    </Question>
  );
};

const Div = styled.div`
  margin-left: 32px;
  margin-bottom: 24px;
  padding: 8px;
  textarea {
    width: 90%;
    border: none;
    border-bottom: 1px solid #9e9e9e;
  }
`;

export default LongAnswer;
