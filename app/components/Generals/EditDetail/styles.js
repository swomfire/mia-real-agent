import styled from 'styled-components';

export const EditFormTitle = styled.span`
  font-size: ${props => props.theme.fontSize.HeadingH3FontSize};
  font-weight: 600;
  color: ${props => props.theme.colorStyled.ColorBlackGrey};
`;

export const EditFormWrapper = styled.div`
  width: 100%;
  padding: 2em;
  height: 100vh;
  .ant-row {
    margin: 0;
  }
`;

export const EditFormActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button:nth-of-type(n+2) {
    margin-left: 1em;
  }
`;
