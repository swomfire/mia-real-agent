import styled from 'styled-components';

export const SupportWrapper = styled.div`
  width: 20.5%;
  position: fixed;
  border-right: 1px solid ${props => props.theme.colorStyled.ColorBorder};
  ${({ visiable }) => !visiable && {
    width: 0,
    paddingLeft: 0,
    paddingRight: 0,
  }}
  bottom: 0;
  right: 26em;
`;

export const SupportWindowWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const SupportWindow = styled.div`
  position: relative;
  margin-right: 26em;
  :first-of-type{
    margin-right: 0;
  }
`;
