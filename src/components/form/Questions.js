import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  DateTimeInput,
  FormTitle,
  MultipleOptionInput,
  TextInput,
} from "../question";
import { useDispatch, useSelector } from "react-redux";
import { BiPlusCircle } from "react-icons/bi";
import { actions } from "../../store/formSlice";
import { infoActions } from "../../store/infoSlice";
import { lighten } from "polished";

const Questions = () => {
  let id = useParams().id;
  let { top } = useSelector((state) => state.info.sideBtn);
  const theme = useSelector((state) => state.forms.find((item) => item.id === id).theme)
  let editQuestionIndex = useSelector((state) => state.info.editQuestionIndex);
  const dispatch = useDispatch();

  const formData = useSelector((state) =>
    state.forms.find((item) => item.id === id)
  );

  const findInputComp = (input, ind) => {
    if (
      input.type === "multiple-choice" ||
      input.type === "dropdown" ||
      input.type === "checkboxes"
    ) {
      return (
        <MultipleOptionInput
          key={ind}
          input={input}
          inputIndex={ind}
          formId={id}
        />
      );
    } else if (input.type === "short-answer" || input.type === "paragraph") {
      return <TextInput key={ind} input={input} inputIndex={ind} formId={id} />;
    } else if (input.type === "date" || input.type === "time") {
      return (
        <DateTimeInput key={ind} input={input} inputIndex={ind} formId={id} />
      );
    }
  };

  const addQuestion = () => {
    dispatch(actions.createInput({ formId: id, editQuestionIndex }));
    dispatch(
      infoActions.setEditQuestionIndex({ inputIndex: editQuestionIndex + 1 })
    );
  };

  return (
    <StyledDiv style={{ backgroundColor: lighten(0.5, theme)}}>
      <Layout>
        <Button
          style={{ position: "absolute", top: `${top}px` }}
          onClick={(e) => addQuestion(e)}
        >
          <BiPlusCircle
            style={{
              width: "40px",
              height: "40px",
              color: theme,
              paddingTop: "5px",
            }}
          />
        </Button>
        <FormTitle
          title={formData.title}
          description={formData.description}
          formId={id}
        />
        {formData.inputs.map((input, ind) => findInputComp(input, ind))}
      </Layout>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  min-height: 80vh;
  padding-bottom: 200px;
  padding-top: 32px;
  margin-top: 100px;
`;

const Layout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.div`
  right: 340px;
  width: 50px;
  height: 50px;
  background-color: white;
  text-align: center;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
`;

export default Questions;
