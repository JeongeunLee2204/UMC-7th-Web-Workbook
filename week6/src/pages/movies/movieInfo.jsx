import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../apis/axios-instance";
import styled from "styled-components";

const MovieInfo = () => {
  const { movieID } = useParams(); // URL에서 영화 ID 추출
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null); // 출연진 정보

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await axiosInstance.get(
          `/movie/${movieID}?language=ko-KR`
        );
        setMovie(movieResponse.data);

        const creditsResponse = await axiosInstance.get(
          `/movie/${movieID}/credits?language=ko-KR`
        );
        setCredits(creditsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieData();
  }, [movieID]);

  if (!movie || !credits) return <p>로딩 중...</p>;

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
  display: flex; /* Flexbox로 좌우 배치 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: space-between; /* 좌우 요소 간격 */
  padding: 20px;
  gap: 20px; /* 요소 간 간격 */
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  margin: 20px;
`;

const Content = styled.div`
  flex: 1; /* 남는 공간을 차지 */
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
  color: gray; /* 작은 회색 글씨 */
`;
