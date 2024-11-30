import styled from "styled-components";

const TitleContainer = styled.div`
  text-align: center;
  padding: 40px 0;
  margin-bottom: 20px;
`;

const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: -1px;
  color: ${(props) => props.theme.textColor};
  transition: color 0.3s ease;
  &:hover {
    color: ${(props) => props.theme.hoverColor};
  }
`;

const SubTitle = styled.p`
  font-size: 1.1rem;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 400;
`;

function Title() {
  return (
    <TitleContainer>
      <MainTitle>
        Task <span>Manager</span>
      </MainTitle>
      <SubTitle>Organize your tasks efficiently</SubTitle>
    </TitleContainer>
  );
}

export default Title;
