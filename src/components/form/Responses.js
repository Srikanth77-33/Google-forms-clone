import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FormTitle,
  MultipleChoice,
  CheckBoxes,
  Dropdown,
  ShortAnswer,
  LongAnswer,
  Date,
  Time,
} from "../view";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { responseActions } from "../../store/responseSlice";
import { lighten } from "polished";

const Responses = () => {
  let id = useParams().id;
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.forms.find((item) => item.id === id).theme)

  const formData = useSelector((state) =>
    state.forms.find((item) => item.id === id)
  );

  const responses = useSelector((state) => state.responses[id]);

  const [responseNum, setResponseNum] = useState(1);

  const findResponseComp = (inputRes, ind) => {
    if (inputRes.type === "multiple-choice") {
      return (
        <MultipleChoice
          key={ind}
          inputIndex={ind}
          formId={id}
          response={inputRes}
        />
      );
    } else if (inputRes.type === "checkboxes") {
      return (
        <CheckBoxes
          key={ind}
          inputIndex={ind}
          formId={id}
          response={inputRes}
        />
      );
    } else if (inputRes.type === "dropdown") {
      return (
        <Dropdown key={ind} inputIndex={ind} formId={id} response={inputRes} />
      );
    } else if (inputRes.type === "short-answer") {
      return (
        <ShortAnswer
          key={ind}
          inputIndex={ind}
          formId={id}
          response={inputRes}
        />
      );
    } else if (inputRes.type === "paragraph") {
      return (
        <LongAnswer
          key={ind}
          inputIndex={ind}
          formId={id}
          response={inputRes}
        />
      );
    } else if (inputRes.type === "date") {
      return (
        <Date key={ind} inputIndex={ind} formId={id} response={inputRes} />
      );
    } else if (inputRes.type === "time") {
      return (
        <Time key={ind} inputIndex={ind} formId={id} response={inputRes} />
      );
    } else {
      return <></>;
    }
  };

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
      responseActions.deleteResponse({
        formId: id,
        responseIndex: responseNum - 1,
      })
    );

    callback();
  };

  return (
    <StyledDiv style={{ backgroundColor: lighten(0.5, theme)}}>
      <div className="top">
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
      </div>
      {responses?.length ? (
        <FormTitle title={formData.title} description={formData.description} formId={id} />
      ) : (
        <></>
      )}
      {responses?.length ? (
        responses[responseNum - 1].map((inputRes, ind) =>
          findResponseComp(inputRes, ind)
        )
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
  .top {
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
  }
`;

export default Responses;
