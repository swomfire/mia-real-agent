import styled from 'styled-components';

export const ReivewFormWrapper = styled.div`
  width: 50%;
`;

export const ReviewFormHeader = styled.div`
  display: flex;
`;

export const ReviewFormTitle = styled.div`
  padding: .5em;
  font-size: 1.4em;
  font-weight: 600;
  flex: 0 0 60%;
`;

export const ReviewFormRequestChangeWrapper = styled.div`
  flex: 0 0 40%;
  display: flex;
  justify-content: flex-end;
  padding-right: 1em;
  align-items: center;
  .value {
    font-weight: 600;
    margin-left: .2em;
    color: ${props => props.theme.colorStyled.ColorPrimary};
  }
`;

export const ReviewFormActionGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    font-size: 1em;
  }
`;

export const ReviewFormActionGroupLeft = styled.div`
  margin-right: auto;
  button:first-child {
    margin-left: 1em;
  }
`;

export const ReviewFormActionGroupRight = styled.div`
  display: flex;
  button {
    margin-right: .5em;
  }
  button:last-child {
    margin-right: 1em;
  }
`;
