import styled, { css } from 'styled-components';

export const AdminPageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
export const LeftSiderBarAdmin = styled.div`
  flex: 0 0 16.25em;
  transition: all 300ms ease;
  ${({ isToggle }) => isToggle && css`
    flex: 0 0 3.125em;
  `}
`;
export const AdminContentGroup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
`;
