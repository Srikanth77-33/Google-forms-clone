import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { responseActions } from "../../store/responseSlice";
import {
  FormTitle,
  MultipleChoice,
  CheckBoxes,
  Dropdown,
  ShortAnswer,
  LongAnswer,
  Date,
  Time,
} from "../view";
import { infoActions } from "../../store/infoSlice";
import { lighten } from "polished";

const View = () => {
  let id = useParams().id;
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.forms.find((item) => item.id === id).theme)

  const isSubmitted = useSelector((state) => state.info.isSubmitted);

  const formData = useSelector((state) =>
    state.forms.find((item) => item.id === id)
  );

  const findInputComp = (input, ind) => {
    if (input.type === "multiple-choice") {
      return (
        <MultipleChoice key={ind} input={input} inputIndex={ind} formId={id} />
      );
    } else if (input.type === "checkboxes") {
      return (
        <CheckBoxes key={ind} input={input} inputIndex={ind} formId={id} />
      );
    } else if (input.type === "dropdown") {
      return <Dropdown key={ind} input={input} inputIndex={ind} formId={id} />;
    } else if (input.type === "short-answer") {
      return (
        <ShortAnswer key={ind} input={input} inputIndex={ind} formId={id} />
      );
    } else if (input.type === "paragraph") {
      return (
        <LongAnswer key={ind} input={input} inputIndex={ind} formId={id} />
      );
    } else if (input.type === "date") {
      return <Date key={ind} input={input} inputIndex={ind} formId={id} />;
    } else if (input.type === "time") {
      return <Time key={ind} input={input} inputIndex={ind} formId={id} />;
    } else {
      return <></>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let response = [];

    let targetIndex = 0;

    formData.inputs.forEach((input) => {
      let inputRes = {
        type: input.type,
        question: input.question,
        required: input.required,
      };
      if (input.type === "multiple-choice" || input.type === "checkboxes") {
        inputRes.ans = [];
        input.options.forEach((option) => {
          inputRes.ans.push({
            option: option,
            value: e.target[targetIndex].checked,
          });
          targetIndex += 1;
        });
      } else {
        inputRes.ans = e.target[targetIndex].value;
        targetIndex += 1;
      }

      response.push(inputRes);
    });

    dispatch(
      responseActions.addResponse({ formId: id, response: [...response] })
    );
    dispatch(infoActions.setIsSubmitted({ isSubmitted: true }));
  };

  return (
    <StyledDiv as="form" style={{ backgroundColor: lighten(0.5, theme)}} onSubmit={handleSubmit}>
      <FormTitle
        title={formData.title}
        description={formData.description}
        isSubmitted={isSubmitted}
        formId={id}
      />
      {!isSubmitted &&
        formData.inputs.map((input, ind) => findInputComp(input, ind))}
      {!isSubmitted && <Button style={{ backgroundColor: theme}}>Submit</Button>}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  min-height: 80vh;
  margin-top: 100px;
  padding-bottom: 64px;
  padding-top: 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  margin-top: 16px;
  color: white;
  padding: 8px 24px;
`;

export default View;
