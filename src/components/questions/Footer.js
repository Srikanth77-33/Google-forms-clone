import React from "react";
import { RiDeleteBin6Line } from "../../icons";
import styled from "styled-components";
import {
  deleteInput,
  setEditQuestionIndex,
  changeRequired,
  useDispatch,
  useSelector,
  getFormData
} from "../../store";

const Footer = ({ formId, inputIndex, required, editQuestionIndex }) => {
  const dispatch = useDispatch();
  const formData = useSelector( getFormData(formId) );

  const handleDelete = () => {
    dispatch(deleteInput({ formId, inputIndex }));
    dispatch(setEditQuestionIndex({ inputIndex: inputIndex - 1 }));

    if (editQuestionIndex === 0 && formData.inputs.length > 1) {
      dispatch(setEditQuestionIndex({ inputIndex: inputIndex }));
    } else {
      dispatch(setEditQuestionIndex({ inputIndex: inputIndex - 1 }));
    }
  };

  const handleCheckboxClick = () => {
    dispatch(changeRequired({ formId, inputIndex, required: !required }));
  };

  return (
    <StyledDiv>
      <RiDeleteBin6Line
        className="delete-icon"
        onClick={() => handleDelete()}
      />
      <span className="line">
      </span>
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
  .delete-icon {
    width: 25px;
    height: 25px;
    color: #868686;
    position: relative;
    top: 5px;
  }
  .line {
    border-right: 2px solid #aaa;
    line-height: 48px;
    margin: 0px 16px;
  }
`;

export default Footer;
