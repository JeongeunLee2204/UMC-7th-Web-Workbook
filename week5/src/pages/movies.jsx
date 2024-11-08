import styled from "styled-components";
import CategoryButton from "./categoryButton";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  margin-top: 0px;
`;

const Movies = () => {
  return (
    <Container>
      <CategoryButton
        text="현재 상영중인"
        image="src/assets/elephant1.jpg"
        destination="now-playing"
      />
      <CategoryButton
        text="인기있는"
        image="src/assets/elephant2.jpg"
        destination="popular"
      />
      <CategoryButton
        text="높은 평가를 받은"
        image="src/assets/elephant3.jpg"
        destination="top-rated"
      />
      <CategoryButton
        text="개봉 예정중인"
        image="src/assets/elephant4.jpg"
        destination="upcoming"
      />
    </Container>
  );
};

export default Movies;
