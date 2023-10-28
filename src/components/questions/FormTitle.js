import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  setTop,
  setEditQuestionIndex,
  useDispatch,
  useSelector,
  updateTitle,
  updateDescription,
  getEditQuestionIndex,
  getTheme,
} from "../../store";

const FormTitle = ({ title, description, formId }) => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const theme = useSelector(getTheme(formId));
  const editQuestionIndex = useSelector(getEditQuestionIndex())

  const [focus, setFocus] = useState("title");

  useEffect(() => {
    if (editQuestionIndex === -1) {
      dispatch(setTop({ top: 130 }));
    }
  }, [editQuestionIndex, dispatch]);

  const handleOnclick = (event, focus) => {
    event.stopPropagation();

    setFocus(focus);

    if (editQuestionIndex !== -1) {
      dispatch(setEditQuestionIndex({ inputIndex: -1 }));

      const top = Math.floor(componentRef.current.offsetTop);
      dispatch(setTop({ top }));
    }
  };

  return (
    <div ref={componentRef}>
      {editQuestionIndex === -1 ? (
        <EditableInput
          focus={focus}
          setFocus={setFocus}
          formId={formId}
          title={title}
          description={description}
          theme={theme}
        />
      ) : (
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

const EditableInput = ({ title, description, formId, focus, setFocus, theme }) => {
  const titleInputRef = useRef();
  const descriptionRef = useRef();
  const dispatch = useDispatch();

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

  const handleUpdateTitle = (title) => {
    dispatch(updateTitle({ formId, title }));
  };

  const handleUpdateDescription = (description) => {
    dispatch(updateDescription({ formId, description }));
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };
  
  const titleStyle = focus === 'title' ? { borderBottom: `2px solid ${theme}`} : {};
  const desStyle = focus === 'description' ? { borderBottom: `2px solid ${theme}`} : {};
 
  return (
    <FromHeader style={{ borderTop: `10px solid ${theme}` }}>
      <input
        className="form-title"
        ref={titleInputRef}
        type="text"
        value={title}
        style={titleStyle}
        onFocus={() => setFocus("title")}
        onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
        onChange={(e) => handleUpdateTitle(e.target.value)}
      />
      <input
        className="description"
        ref={descriptionRef}
        type="text"
        value={description}
        style={desStyle}
        placeholder="Form description"
        onFocus={() => setFocus('description')}
        onKeyDown={(e) => handleKeyDown(e, null)}
        onChange={(e) => handleUpdateDescription(e.target.value)}
      />
    </FromHeader>
  );
};

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

export default FormTitle;
