import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actions } from "../../store/formSlice";
import { infoActions } from "../../store/infoSlice";

const Footer = ({ formId, inputIndex, required, editQuestionIndex }) => {
  const dispatch = useDispatch();

  const formData = useSelector((state) =>
    state.forms.find((item) => item.id === formId)
  );

  const handleDelete = () => {
    dispatch(actions.deleteInput({ formId, inputIndex }));
    dispatch(infoActions.setEditQuestionIndex({ inputIndex: inputIndex - 1 }));

    if (editQuestionIndex === 0 && formData.inputs.length > 1) {
      dispatch(infoActions.setEditQuestionIndex({ inputIndex: inputIndex }));
    } else {
      dispatch(
        infoActions.setEditQuestionIndex({ inputIndex: inputIndex - 1 })
      );
    }
  };

  const handleCheckboxClick = () => {
    dispatch(
      actions.changeRequired({ formId, inputIndex, required: !required })
    );
  };

  return (
    <StyledDiv>
      <RiDeleteBin6Line
        onClick={() => handleDelete()}
        style={{
          width: "25px",
          height: "25px",
          color: "#868686",
          position: "relative",
          top: "5px",
        }}
      />
      <span
        style={{
          borderRight: "2px solid #aaa",
          lineHeight: "48px",
          margin: "0px 16px",
        }}
      ></span>
      <label>
        <span>Required</span>
        <input
          className="checkbox"
          type="checkbox"
          checked={required}
          onChange={() => handleCheckboxClick()}
        />
      </label>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  margin-right: 24px;
  height: 48px;
  border-top: 1px solid #eee;
  text-align: right;
  .checkbox {
    height: 16px;
    width: 16px;
    position: relative;
    top: 2px;
  }
`;
export default Footer;
