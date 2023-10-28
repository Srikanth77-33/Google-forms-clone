import React from "react";
import styled from "styled-components";
import { getTheme, setIsSubmitted, useDispatch, useSelector } from "../../store";

const FormTitle = ({ title, description, isSubmitted, formId }) => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme(formId));

  const handleClick = () => {
    dispatch(setIsSubmitted({ isSubmitted: false }));
  };

  return (
    <StyledDiv style={{ borderTop: `10px solid ${theme}` }}>
      <div className="form-title">{title}</div>
      {!isSubmitted ? (
        <div className="description">
          {description ? description : "Form description"}
        </div>
      ) : (
        <div>
          <div>Your response has been recorded.</div>
          <div className="link" onClick={() => handleClick()}>
            Submit another response
          </div>
        </div>
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  width: 600px;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
  min-height: 136px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 0 2px #d9d9d9;
  .form-title,
  .description {
  }
  .form-title {
    height: 48px;
    font-size: 32px;
    margin-bottom: 16px;
  }
  .description {
    font-size: 16px;
    opacity: 0.7;
  }
  .link {
    color: #1a73e8;
    padding-top: 8px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default FormTitle;
