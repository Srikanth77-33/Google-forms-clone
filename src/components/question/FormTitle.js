import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actions } from "../../store/formSlice";
import { infoActions } from "../../store/infoSlice";

const EditableInput = ({ title, description, formId, focus }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.forms.find((item) => item.id === formId).theme)

  const titleInputRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (focus === "title" && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [titleInputRef, focus]);

  useEffect(() => {
    if (focus === "description" && descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, [descriptionRef, focus]);

  const updateTitle = (title) => {
    dispatch(actions.updateTitle({ formId, title }));
  };

  const updateDescription = (description) => {
    dispatch(actions.updateDescription({ formId, description }));
  };
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleFocus = (name) => {
    if (name) {
      if (titleInputRef && titleInputRef.current) {
        titleInputRef.current.style.borderBottom = `2px solid ${theme}`;
      }
    } else {
      if (descriptionRef && descriptionRef.current) {
        descriptionRef.current.style.borderBottom = `2px solid ${theme}`;
      }
    }
  };

  const handleBlur = (name) => {
    if( name ) {
      if (titleInputRef && titleInputRef.current) {
        titleInputRef.current.style.borderBottom = `1px solid #9e9e9e`;
      }
    } else {
      if (descriptionRef && descriptionRef.current) {
        descriptionRef.current.style.borderBottom = `1px solid #9e9e9e`;
      }
    }
  };

  return (
    <FromHeader style={{ borderTop: `10px solid ${theme}` }}>
      <input
        className="form-title"
        ref={titleInputRef}
        type="text"
        value={title}
        onFocus={() => handleFocus("title")}
        onBlur={() => handleBlur("title")}
        onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
        onChange={(e) => updateTitle(e.target.value)}
      />
      <input
        className="description"
        ref={descriptionRef}
        type="text"
        value={description}
        placeholder="Form description"
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        onKeyDown={(e) => handleKeyDown(e, null)}
        onChange={(e) => updateDescription(e.target.value)}
      />
    </FromHeader>
  );
};

const FormTitle = ({ title, description, formId }) => {
  const componentRef = useRef();
  const theme = useSelector((state) => state.forms.find((item) => item.id === formId).theme)

  const editQuestionIndex = useSelector(
    (state) => state.info.editQuestionIndex
  );

  const [focus, setFocus] = useState("title");

  const dispatch = useDispatch();

  useEffect(() => {
    if (editQuestionIndex === -1) {
      dispatch(infoActions.setTop({ top: 130 }));
    }
  }, [editQuestionIndex, dispatch]);

  const handleOnclick = (event, focus) => {
    event.stopPropagation();

    setFocus(focus);

    if (editQuestionIndex !== -1) {
      dispatch(infoActions.setEditQuestionIndex({ inputIndex: -1 }));

      const top = Math.floor(componentRef.current.offsetTop);
      dispatch(infoActions.setTop({ top }));
    }
  };

  return (
    <div ref={componentRef}>
      {editQuestionIndex === -1 && (
        <EditableInput
          focus={focus}
          formId={formId}
          title={title}
          description={description}
        />
      )}
      {editQuestionIndex !== -1 && (
        <StyledDiv
          style={{ borderTop: `10px solid ${theme}` }}
          onClick={(e) => handleOnclick(e, "title")}
        >
          <div
            className="form-title"
            onClick={(e) => handleOnclick(e, "title")}
          >
            {title}
          </div>
          <div
            className="description"
            onClick={(e) => handleOnclick(e, "description")}
          >
            {description ? description : "Form description"}
          </div>
        </StyledDiv>
      )}
    </div>
  );
};

const FromHeader = styled.div`
  display: flex;
  width: 600px;
  border-left: 5px solid #4285f4;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
  height: 136px;
  border-radius: 4px;
  box-shadow: 0 0 0 2px #d9d9d9;
  background-color: white;
  .form-title,
  .description {
    width: 90%;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    &:focus {
      outline: none;
    }
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
`;

const StyledDiv = styled.div`
  display: flex;
  width: 600px;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
  height: 136px;
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
`;

export default FormTitle;
