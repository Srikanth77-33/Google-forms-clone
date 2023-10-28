import React from "react";
import styled from "styled-components";
import {
  MultipleChoice,
  CheckBoxes,
  Dropdown,
  ShortAnswer,
  LongAnswer,
  Date,
  Time,
} from "../common";

const Questions = ({ formData: { inputs, id, theme }, isSubmitted }) => {
  if (!isSubmitted) {
    return (
      <div style={{ textAlign: 'center'}}>
        <div style={{ textAlign: 'start'}}>
          {inputs.map((input, ind) => (
            <Question key={ind} formId={id} input={input} ind={ind} />
          ))}
        </div>
        <Button style={{ backgroundColor: theme }}>Submit</Button>
      </div>
    );
  } else {
    return <></>;
  }
};

const Question = ({ input, ind, formId }) => {
  if (input.type === "multiple-choice") {
    return (
      <MultipleChoice
        key={ind}
        input={input}
        inputIndex={ind}
        formId={formId}
      />
    );
  } else if (input.type === "checkboxes") {
    return (
      <CheckBoxes key={ind} input={input} inputIndex={ind} formId={formId} />
    );
  } else if (input.type === "dropdown") {
    return (
      <Dropdown key={ind} input={input} inputIndex={ind} formId={formId} />
    );
  } else if (input.type === "short-answer") {
    return (
      <ShortAnswer key={ind} input={input} inputIndex={ind} formId={formId} />
    );
  } else if (input.type === "paragraph") {
    return (
      <LongAnswer key={ind} input={input} inputIndex={ind} formId={formId} />
    );
  } else if (input.type === "date") {
    return <Date key={ind} input={input} inputIndex={ind} formId={formId} />;
  } else if (input.type === "time") {
    return <Time key={ind} input={input} inputIndex={ind} formId={formId} />;
  } else {
    return <></>;
  }
};

const Button = styled.button`\
  margin-top: 16px;
  color: white;
  padding: 8px 24px;
`;

export default Questions;
