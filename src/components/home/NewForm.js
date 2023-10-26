import React from "react";
import styled from "styled-components";
import blankFromImg from "../../images/forms-blank-googlecolors.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../store/formSlice";

function NewForm() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  let handleClick = () => {
    let newId = Date.now().toString();
    dispatch(actions.createBlankForm(newId));
    nav(`${newId}/edit`);
  };

  return (
    <StyledDiv>
      <div className="title">Start a new form</div>
      <div>
        <img
          className="boxImage"
          src={blankFromImg}
          style={{ borderRadius: "4px" }}
          alt="Blank_form_Img"
          onClick={() => handleClick()}
        />
        <div style={{ textAlign: "center", width: "152px" }}>Blank</div>
      </div>
    </StyledDiv>
  );
}

export default NewForm;

let StyledDiv = styled.div`
  height: 250px;
  width: 100%;
  background-color: #dadce0;
  padding: 0px 64px;
  .title {
    background-color: #dadce0;
    height: 64px;
    line-height: 64px;
  }
  .boxImage {
    width: 152px;
    height: 114px;
    background-color: white;
  }
`;
