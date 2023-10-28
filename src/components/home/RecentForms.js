import React from "react";
import styled from "styled-components";
import logo from "../../images/forms.png";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "../../icons";
import { deleteForm, useSelector, useDispatch, getForms } from "../../store";

const RecentForms = () => {
  const forms = useSelector(getForms());

  return (
    <StyledDiv>
      <div className="title">Recent Forms</div>
      {forms.length ? (
        <Card forms={forms} />
      ) : (
        <div className="card">
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "8px",
              paddingTop: "28px",
            }}
          >
            No forms yet
          </div>
          <div> Click + to create new form</div>
        </div>
      )}
    </StyledDiv>
  );
};

const Card = ({ forms }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (ind) => {
    dispatch(deleteForm({ formIndex: ind }));
  };

  return (
    <div style={{ display: "flex", gap: "12px" }}>
      {forms.map(({ title, id }, ind) => (
        <Item key={id}>
          <div
            onClick={() => nav(`/${id}/edit`)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img className="logo" src={logo} alt="logo" />
            <div className="card-title">
              {title.length < 15 ? title : title.substring(0, 15) + "..."}
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={() => handleDelete(ind)}
            className="icon"
          />
        </Item>
      ))}
    </div>
  );
};

const StyledDiv = styled.div`
  margin: 0px 64px;
  .title {
    line-height: 64px;
  }
  .card {
    text-align: center;
    height: 128px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const Item = styled.div`
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  width: 220px;
  min-height: 74px;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  .logo {
    width: 40px;
  }
  .card-title {
    position: relative;
    width: 150px;
  }
  .icon {
    width: 28px;
    height: 28px;
    color: #868686;
    :hover {
      cursor: pointer;
    }
  }
`;

export default RecentForms;
