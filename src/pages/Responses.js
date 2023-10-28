import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FormTitle } from "../components/common";
import { ResponseComponents, Editor } from "../components/responses";
import { lighten } from "polished";
import { getFormData, getResponses, getTheme, useSelector } from "../store";

const Responses = () => {
  let id = useParams().id;
  const theme = useSelector(getTheme(id));
  const responses = useSelector(getResponses(id));
  const formData = useSelector(getFormData(id));

  const [responseNum, setResponseNum] = useState(1);

  return (
    <StyledDiv style={{ backgroundColor: lighten(0.5, theme) }}>
      <Editor
        responses={responses}
        responseNum={responseNum}
        setResponseNum={setResponseNum}
        formId={id}
      />
      {responses?.length ? (
        <>
          <FormTitle
            title={formData.title}
            description={formData.description}
            formId={id}
          />
          <ResponseComponents
            responses={responses[responseNum - 1]}
            formId={id}
          />
        </>
      ) : (
        <></>
      )}
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

export default Responses;
