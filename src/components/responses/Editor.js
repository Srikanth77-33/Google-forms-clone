import React from "react";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  RiDeleteBin6Line,
} from "../../icons";
import { deleteResponse, useDispatch } from "../../store";

const Editor = ({ responses, responseNum, setResponseNum, formId }) => {
  const dispatch = useDispatch();

  const handleLeftArrow = () => {
    if (responseNum > 1) {
      setResponseNum(responseNum - 1);
    }
  };

  const handleRightArrow = () => {
    if (responseNum < responses?.length) {
      setResponseNum(responseNum + 1);
    }
  };

  const callback = () => {
    if (responses.length <= responseNum) {
      setResponseNum(responseNum - 1);
    } else {
      setResponseNum(responseNum);
    }
  };

  const handleDelete = () => {
    dispatch(
      deleteResponse({
        formId: formId,
        responseIndex: responseNum - 1,
      })
    );

    callback();
  };

  return (
    <StyledDiv>
      <div className="title">{`${
        responses?.length ? responses.length : 0
      } responses`}</div>
      {responses?.length ? (
        <div className="flex">
          <div>
            <MdOutlineKeyboardArrowLeft
              className="arrow"
              style={{ opacity: responseNum <= 1 ? 0.2 : 1 }}
              onClick={() => handleLeftArrow()}
            />
            <span className="current-res">{responseNum}</span>
            <span>of</span>
            <span>{responses?.length}</span>
            <MdOutlineKeyboardArrowRight
              className="arrow"
              style={{ opacity: responseNum >= responses?.length ? 0.2 : 1 }}
              onClick={() => handleRightArrow()}
            />
          </div>
          <div>
            <RiDeleteBin6Line
              className="delete-btn"
              onClick={() => handleDelete()}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  box-shadow: 0 0 0 1px #d9d9d9;
  width: 600px;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 16px;
  .title {
    height: 48px;
    margin-top: 16px;
    font-size: 32px;
    margin-bottom: 16px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    padding: 24px 24px;

    span {
      font-size: 18px;
      padding: 0px 16px;
    }
    .current-res {
      padding-bottom: 8px;
      font-size: 22px;
      border-bottom: 1px solid #868686;
    }
    .arrow {
      width: 24px;
      height: 24px;
      padding: 0px 8px;
      position: relative;
      top: 6px;
    }
    .delete-btn {
      padding-right: 24px;
      width: 25px;
      height: 25px;
      position: relative;
      color: #868686;
      top: 6px;
    }
  }
`;
export default Editor;
