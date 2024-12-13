import styled from 'styled-components';

const CardArea = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  border: 2px solid #ccc;
  width: 95%;
  height: 150px;
  display: flex;
  flex-direction: row;
  background-color: #f5f5f5;
  border-radius: 4px;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: center;
`;

export default CardArea;
