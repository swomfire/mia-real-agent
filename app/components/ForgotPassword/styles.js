import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { LoginBtn } from '../../stylesheets/Button.style';

export const ForgotWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/images/bg-login.jpg');
  background-position: left center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ForgotItem = styled.div`
  width: 32.250em;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 0px 17px -3px #2a3a516e;
  padding: 2em;
  color: #6e6c83fa;
  position: relative;
  z-index: 1;
  ${({ register }) => register && css`
    width: 640px;
  `};
`;

export const ForgotLogo = styled.div`
  text-align: center;
  font-size: 2em;
  width: 6.125em;
  height: 4.063em;
  margin: 0 auto 1em;
  color: ${props => props.theme.textColor};
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ForgotInputWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 55px;
`;

export const ForgotInput = styled.input`
  width: 100%;
  height: 27.5px;
  border: 0;
  outline: 0 none;
  transition: border-color .2s linear;
  border-bottom: 1px solid ${props => props.theme.textColor};
  -webkit-font-smoothing: antialiased;
  background-color: transparent;
`;

export const ForgotLabel = styled.div`
  margin-bottom: 5px;
  color: ${props => props.theme.textColor};
`;

export const ForgotBtn = styled(LoginBtn)`

`;

export const ForgotFBBtn = styled(ForgotBtn)`
  border: 1px solid #3b5998;
  background: #3b5998;
  color: ${props => props.theme.secondaryColor};
  i {
    font-size: 16px;
    margin-right: 5px;
  }
  &:hover {
    background: ${props => props.theme.secondaryColor};
    color: #3b5998;
  }
`;

export const ForgotFooter = styled.div`
  margin-top: 15px;
  text-align: center;
  div{
    margin-top: 10px;
  }
`;

export const ForgotFooterText = styled.span`
`;

export const ForgotFooterLink = styled(Link)`
  margin-left: 3px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    color: #1872bb;
  }
`;

const spin = keyframes`
  100% {
    transform:rotate(360deg);
  }
`;

export const ForgotSpinner = styled.div`
  border: 2px solid;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border-color:black black black transparent;
  animation: ${spin} 2s linear infinite;
  margin-right: 5px;
  display: inline-block;
`;

export const ForgotErrorMessage = styled.div`
  color: crimson;
  text-align: center;
  margin-bottom: 15px;
`;
