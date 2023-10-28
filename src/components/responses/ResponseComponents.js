import React from "react";
import {
  MultipleChoice,
  CheckBoxes,
  Dropdown,
  ShortAnswer,
  LongAnswer,
  Date,
  Time,
} from "../common";

const ResponseComponents = ({ responses, formId }) => {
  return responses.map((inputRes, ind) => (
    <Response formId={formId} ind={ind} inputRes={inputRes} />
  ));
};

const Response = ({ inputRes, ind, formId }) => {
  if (inputRes.type === "multiple-choice") {
    return (
      <MultipleChoice
        key={ind}
        inputIndex={ind}
        formId={formId}
        response={inputRes}
      />
    );
  } else if (inputRes.type === "checkboxes") {
    return (
      <CheckBoxes
        key={ind}
        inputIndex={ind}
        formId={formId}
        response={inputRes}
      />
    );
  } else if (inputRes.type === "dropdown") {
    return (
      <Dropdown
        key={ind}
        inputIndex={ind}
        formId={formId}
        response={inputRes}
      />
    );
  } else if (inputRes.type === "short-answer") {
    return (
      <ShortAnswer
        key={ind}
        inputIndex={ind}
        formId={formId}
        response={inputRes}
      />
    );
  } else if (inputRes.type === "paragraph") {
    return (
      <LongAnswer
        key={ind}
        inputIndex={ind}
        formId={formId}
        response={inputRes}
      />
    );
  } else if (inputRes.type === "date") {
    return (
      <Date key={ind} inputIndex={ind} formId={formId} response={inputRes} />
    );
  } else if (inputRes.type === "time") {
    return (
      <Time key={ind} inputIndex={ind} formId={formId} response={inputRes} />
    );
  } else {
    return <></>;
  }
};

export default ResponseComponents;
