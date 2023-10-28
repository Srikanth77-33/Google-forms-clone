import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  FormTitle,
  SideButton,
  QuestionComponents,
} from "../components/questions";
import { getFormData, useSelector, getTheme } from "../store";
import { lighten } from "polished";

const Questions = () => {
  let id = useParams().id;
  const theme = useSelector(getTheme(id));
  const formData = useSelector(getFormData(id));

  return (
    <Layout style={{ backgroundColor: lighten(0.5, theme) }}>
      <SideButton formId={id} theme={theme} />
      <FormTitle
        title={formData.title}
        description={formData.description}
        formId={id}
      />
      <QuestionComponents formData={formData} />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
  padding-bottom: 200px;
  padding-top: 32px;
  margin-top: 100px;
`;

export default Questions;
