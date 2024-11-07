import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <PosterImage
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />
      <MovieInfo>
        <Title>{movie.title}</Title>
        <ReleaseDate>{movie.release_date}</ReleaseDate>
      </MovieInfo>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  width: 150px;
  height: 230px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  background-color: #1e1e1e;
  margin: 10px;

  &:hover {
    transform: scale(1.05);
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: 75%;
  display: block;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const MovieInfo = styled.div`
  padding: 5px;
  text-align: left;
  width: 100%;
  height: 25%;
  box-sizing: border-box;
  background-color: #333;
  color: #fff;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ReleaseDate = styled.div`
  font-size: 12px;
  color: #aaa;
`;
