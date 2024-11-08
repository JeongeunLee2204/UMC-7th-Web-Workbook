import { HiOutlineFilm, HiSearchCircle } from "react-icons/hi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: #1c1c1c;
  min-height: 100vh;
`;

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <SidebarContainer>
      <StyledButton onClick={() => navigate("/search")}>
        <HiSearchCircle /> 찾기
      </StyledButton>
      <StyledButton onClick={() => navigate("/movies")}>
        <HiOutlineFilm /> 영화
      </StyledButton>
    </SidebarContainer>
  );
};

export default Sidebar;
