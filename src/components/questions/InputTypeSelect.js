import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { types } from ".";
import { MdOutlineKeyboardArrowDown } from "../../icons";
import { changeType, useDispatch } from "../../store";

const InputTypeSelect = ({ inputIndex, inputType }) => {
  const componentRef = useRef();
  const [showDropdown, setShowDropDown] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [componentRef]);

  return (
    <Container ref={componentRef}>
      <div className="selected-type" onClick={() => setShowDropDown(true)}>
        <div>
          {types[inputType].icon}
          {types[inputType].title}
        </div>
        <MdOutlineKeyboardArrowDown
          style={{
            width: "24px",
            height: "24px",
            position: "relative",
            color: "#868686",
            top: "12px",
            right: "8px",
          }}
        />
      </div>
      {showDropdown ? (
        <DropDown
          setShowDropDown={setShowDropDown}
          inputIndex={inputIndex}
          currentType={inputType}
        />
      ) : <></>}
    </Container>
  );
};

const DropDown = ({ setShowDropDown, inputIndex, currentType }) => {
  const id = useParams().id;
  const dispatch = useDispatch();

  const handleClick = (type) => {
    if (currentType !== type) {
      dispatch(
        changeType({
          formId: id,
          inputIndex: inputIndex,
          inputType: type,
        })
      );
    }
    setShowDropDown(false);
  };

  return (
    <StyledDiv>
      {Object.keys(types).map((key) => (
        <div
          className={currentType === key ? "seleted-option" : "option"}
          key={key}
          onClick={() => handleClick(key)}
        >
          {types[key].icon} {types[key].title}
        </div>
      ))}
    </StyledDiv>
  );
};

const Container = styled.div`
  width: 222px;
  height: 48px;
  border: 1px solid #acacac;
  .selected-type {
    line-height: 46px;
    padding-left: 24px;
    display: flex;
    justify-content: space-between;
  }
`;

const StyledDiv = styled.div`
  padding: 5px;
  top: -100px;
  left: -3px;
  width: 226px;
  z-index: 1;
  position: relative;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3);
  .option {
    padding: 12px 0px 20px 24px;
    &:hover {
      background-color: #eee;
    }
  }
  .seleted-option {
    padding: 12px 0px 20px 24px;
    background-color: #bde0f0;
  }
`;

export default InputTypeSelect;
