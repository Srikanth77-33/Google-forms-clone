import React, { useState } from "react";
import styled from "styled-components";
import logo from "../images/forms.png";
import { NavLink, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdOutlineColorLens } from "../icons";
import {
  changeTheme,
  getFormData,
  getTheme,
  useDispatch,
  useSelector,
  getResponses,
} from "../store";

const HeaderLayout = () => {
  let id = useParams().id;
  const dispatch = useDispatch();

  const theme = useSelector(getTheme(id));
  const formData = useSelector(getFormData(id));
  const responses = useSelector(getResponses(id));

  let [background, setBackground] = useState("black");

  const style = ({ isActive }) => {
    if (isActive) {
      setBackground(theme);
      return { color: theme, borderBottom: `2px solid ${theme}` };
    } else {
      setBackground("black");
      return { color: "black", borderBottom: "none" };
    }
  };

  const onChangeTheme = (e) => {
    dispatch(changeTheme({ formId: id, theme: e.target.value }));
  };

  return (
    <div key={id}>
      <div style={{ position: "fixed", top: "0px", width: "100vw", zIndex: 1 }}>
        <Head>
          <div style={{ display: "flex" }}>
            <img src={logo} className="logo" alt="forms_logo" />
            <span className="title">{formData.title}</span>
          </div>
          <div>
            <MdOutlineColorLens
              style={{
                width: "40px",
                height: "40px",
                position: "relative",
                left: "40px",
                top: "6px",
                color: theme,
              }}
            />
            <input
              type="color"
              name="theme"
              onChange={(e) => onChangeTheme(e)}
              style={{ opacity: "0", width: "40px", height: "40px" }}
            />
          </div>
        </Head>
        <Nav>
          <NavLink style={style} className="navLink" to="edit">
            Questions
          </NavLink>
          <NavLink style={style} className="navLink" to="view">
            View
          </NavLink>
          <NavLink style={style} className="navLink" to="responses">
            Responses
            <span
              className={responses?.length > 0 ? "span" : ""}
              style={{ backgroundColor: background }}
            >
              {responses?.length > 0 ? responses.length : ""}
            </span>
          </NavLink>
        </Nav>
      </div>
      <Outlet />
    </div>
  );
};

const Head = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 16px 24px 0px;
  .logo {
    width: 40px;
    height: 44px;
  }
  .title {
    font-size: 22px;
    font-weight: 600;
    padding-top: 10px;
  }
`;

const Nav = styled.div`
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: center;
  gap: 24px;
  .navLink {
    display: block;
    text-decoration: none;
    padding: 8px 0px;
    color: black;
  }
  .span {
    display: inline-block;
    border-radius: 40%;
    color: white;
    padding: 0px 3px;
    margin-left: 8px;
  }
`;

export default HeaderLayout;
