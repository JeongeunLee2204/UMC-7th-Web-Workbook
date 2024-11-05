import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #1c1c1c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Logo = styled.div`
  color: #f54291;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px;
`;

const Button = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f54291;
  }
`;

function Navbar() {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <Logo onClick={() => navigate("/")}>YONGCHA</Logo>
      <ButtonContainer>
        <Button onClick={() => navigate("/login")}>로그인</Button>
        <Button onClick={() => navigate("/signup")}>회원가입</Button>
      </ButtonContainer>
    </NavbarContainer>
  );
}

export default Navbar;
