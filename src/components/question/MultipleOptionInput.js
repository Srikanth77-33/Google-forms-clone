import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Input } from ".";
import { IoRadioButtonOffOutline } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/formSlice";
import QuestionLayout from "../layouts/QuestionLayout";
import { infoActions } from "../../store/infoSlice";

const Option = ({
  optionIndex,
  icon,
  input,
  option,
  formId,
  inputIndex,
  focus,
  setFocus,
}) => {
  const dispatch = useDispatch();
  const optionRef = useRef();
  const theme = useSelector((state) => state.forms.find((item) => item.id === formId).theme)
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focus === `option${optionIndex}` && optionRef.current) {
      optionRef.current.focus();
    }
  }, [focus, optionIndex, optionRef]);

  const updateOption = (option, optionIndex) => {
    dispatch(actions.updateOption({ formId, inputIndex, optionIndex, option }));
  };
  const deleteOption = (optionIndex) => {
    dispatch(actions.deleteOption({ formId, inputIndex, optionIndex }));
    setFocus(`option${optionIndex - 1}`);
  };

  const style = {
    ...( focused && { borderBottom: `2px solid ${theme}` })
  }

  return (
    <div
      key={optionIndex}
      style={{
        margin: "16px 16px 0px 16px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex" }}>
        {input.type === "dropdown" ? `${optionIndex + 1}.` : icon}
        <Input
          ref={optionRef}
          type="text"
          className="option"
          value={option}
          style={style}
          onFocus={() => setFocused(true) }
          onBlur={() => setFocused(false) }
          onChange={(e) => updateOption(e.target.value, optionIndex)}
        />
      </div>
      <RxCross1
        style={{
          width: "20px",
          height: "20px",
          position: "relative",
          bottom: "-3px",
        }}
        onClick={() => deleteOption(optionIndex)}
      />
    </div>
  );
};

const EditableInput = ({
  formId,
  inputIndex,
  input,
  icon,
  focus,
  setFocus,
}) => {
  const dispatch = useDispatch();

  const addOption = (option) => {
    dispatch(actions.addOption({ formId, inputIndex, option }));
    setFocus(`option${input.options.length}`);
  };

  return (
    <StyledDiv>
      {input.options.map((option, optionIndex) => (
        <Option
          key={optionIndex}
          optionIndex={optionIndex}
          icon={icon}
          input={input}
          option={option}
          formId={formId}
          inputIndex={inputIndex}
          focus={focus}
          setFocus={setFocus}
        />
      ))}
      <div style={{ margin: "16px", fontSize: "14px", color: "GrayText" }}>
        {input.type === "dropdown" ? `${input.options.length + 1}.` : icon}
        <span
          style={{ marginLeft: "5px" }}
          onClick={() => addOption(`option ${input.options.length + 1}`)}
        >
          Add option
        </span>
      </div>
    </StyledDiv>
  );
};

const MultipleOptionInput = ({ input, inputIndex, formId }) => {
  const [focus, setFocus] = useState("question");
  const dispatch = useDispatch();

  const editQuestionIndex = useSelector(
    (state) => state.info.editQuestionIndex
  );

  let icon =
    input.type === "multiple-choice" ? (
      <IoRadioButtonOffOutline
        style={{
          width: "20px",
          height: "20px",
          position: "relative",
          bottom: "-4px",
        }}
      />
    ) : (
      <MdCheckBoxOutlineBlank
        style={{
          width: "20px",
          height: "20px",
          position: "relative",
          bottom: "-4px",
        }}
      />
    );

  const handleClick = (e, focus) => {
    e.stopPropagation();
    setFocus(focus);

    if (editQuestionIndex !== inputIndex) {
      dispatch(infoActions.setEditQuestionIndex({ inputIndex }));
    }
  };

  return (
    <QuestionLayout
      input={input}
      inputIndex={inputIndex}
      formId={formId}
      handleClick={handleClick}
      focus={focus}
    >
      <div style={{ transition: "all 0.5s ease" }}>
        {editQuestionIndex === inputIndex && (
          <EditableInput
            formId={formId}
            inputIndex={inputIndex}
            input={input}
            icon={icon}
            focus={focus}
            setFocus={setFocus}
          />
        )}
        {editQuestionIndex !== inputIndex && (
          <Div>
            {input.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="option"
                onClick={(e) => handleClick(e, `option${optionIndex}`)}
              >
                <div style={{ position: "relative", top: "-2px" }}>
                  {" "}
                  {input.type === "dropdown" ? `${optionIndex + 1}.` : icon}
                </div>
                <div style={{ marginLeft: "8px" }}> {option}</div>
              </div>
            ))}
          </Div>
        )}
      </div>
    </QuestionLayout>
  );
};

const StyledDiv = styled.div`
  .option {
    margin-left: 5px;
    width: 525px;
    height: 22px;
    &:hover {
      border-bottom: 1px solid #868686;
    };
  }
`;

const Div = styled.div`
  .option {
    display: flex;
    margin: 16px 16px 16px 32px;
  }
`;

export default MultipleOptionInput;
