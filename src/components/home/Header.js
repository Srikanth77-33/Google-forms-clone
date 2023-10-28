import React from "react";
import logo from "../../images/forms.png";
import styled from "styled-components";

const Header = () => {
  return (
    <Head>
      <img src={logo} className="logo" alt="forms_logo" />
      <div className="title">Forms</div>
    </Head>
  );
};

const Head = styled.div`
  display: flex;
  padding: 10px 20px;
  .logo {
    width: 40px;
    height: 44px;
  }
  .title {
    font-size: 22px;
    padding-top: 7px;
    font-weight: 600;
  }
`;

export default Header;