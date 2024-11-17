import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { axiosInstance } from "../../apis/axios-instance";
import styled from "styled-components";

const fetchMovie = async (movieID) => {
  const response = await axiosInstance.get(`/movie/${movieID}?language=ko-KR`);
  return response.data;
};

const fetchCredits = async (movieID) => {
  const response = await axiosInstance.get(
    `/movie/${movieID}/credits?language=ko-KR`
  );
  return response.data;
};

const MovieInfo = () => {
  const { movieID } = useParams();

  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery(["movie", movieID], () => fetchMovie(movieID));

  const {
    data: credits,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
  } = useQuery(["credits", movieID], () => fetchCredits(movieID));

  if (isMovieLoading || isCreditsLoading) return <p>로딩 중...</p>;
  if (isMovieError || isCreditsError)
    return <p>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;

  return (
    <Container>
      <ContentContainer>
        <Content>
          <h1>{movie.title}</h1>
          <p>평점: {movie.vote_average}</p>
          <p>발매 연도: {movie.release_date.split("-")[0]}</p>
          <p>상영 시간: {movie.runtime}분</p>
          <p>소개: {movie.overview}</p>
        </Content>
        <BackgroundImage posterPath={movie.backdrop_path} />
      </ContentContainer>

      <CreditsSection>
        <h2>감독/출연</h2>
        <CreditsList>
          {credits.cast.slice(0, 10).map((person) => (
            <CreditItem key={person.cast_id}>
              <PersonImage
                src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                alt={person.name}
              />
              <p>{person.name}</p>
              <CharacterName>{person.character}</CharacterName>
            </CreditItem>
          ))}
        </CreditsList>
      </CreditsSection>
    </Container>
  );
};

export default MovieInfo;

const Container = styled.div`
  color: white;
  padding: 0;
  background-color: #121212;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  margin: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  color: white;
  z-index: 1;
`;

const BackgroundImage = styled.div`
  width: 300px;
  height: 450px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w200${props.posterPath}`});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const CreditsSection = styled.div`
  margin-top: 5px;
`;

const CreditsList = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
`;

const CreditItem = styled.div`
  text-align: center;
  min-width: 100px;
`;

const PersonImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const CharacterName = styled.p`
  font-size: 12px;
  color: gray;
`;
