/**
 * Created by vienpn on 21/08/19.
 */
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const spin = keyframes`
  100% {
    transform:rotate(360deg);
  }
`;

export const Button = styled.button`
  text-align: center;
  border-radius: ${props => props.theme.borderRadius.borderbtn};
  user-select: none;
  font-size: ${props => props.theme.fontSize.BaseFontSize};
  cursor: pointer;
  border: none;
  color: ${props => props.theme.colorStyled.ColorPrimary};
  padding: .875em;
  background: ${props => props.theme.colorStyled.colorBtn};
  display: flex;
  align-items: center;
  min-width: 10em;
  justify-content: center;
  transition: .3s ease;
  ${props => props.full && css`
    width: 100%;  
    padding: 1em;
  `}
  ${props => props.fullSmall && css`
    width: 100%;  
    padding: .5em;
  `}
  &:hover{
    opacity: 0.8;
  }
`;

export const ArrayAddButton = styled.button`
  display: flex;
  align-items: center;
  margin-right: 5px;
  border-radius: 5px;
  padding: 5px 10px 5px 5px;
  font-size: 13px;
  border-radius: 3px;
  color: #ff5402;
  background: white;
  border: 1px solid #ff5402;
  i {
    margin-right: 3px;
  }
  &:hover {
    border-color: ${props => props.theme.colorStyled.ColorBgDefault};
    color: ${props => props.theme.colorStyled.ColorBgDefault};
  }
`;

export const ActionForm = styled.div`

`;

export const ButtonChoose = styled.button`
  flex: 1;
  background: transparent;
  border: none;
  height: 12.500em;
  padding: 0;
  font-size: ${props => props.theme.fontSize.HeadingH3FontSize};
  color: ${props => props.theme.colorStyled.ColorXLightGrey};
  span{
    width: 100%;
    display: inline-block;
  }
  i.anticon{
      font-size: ${props => props.theme.fontSize.XLargeFontSize};
  }
  &:hover{
    color: ${props => props.theme.colorStyled.ColorBgDefault};
  }  
`;

export const ButtonCancel = styled(Button)`
  min-width: 6.25em;
  width: 7.250em;
  height: 2.438em;
  padding: 0;
  border-radius: ${props => props.theme.borderRadius.borderBtnSmall};
  border: 1px solid ${props => props.theme.colorStyled.ColorBgBtnCancel};
  background: ${props => props.theme.colorStyled.ColorBgBtnCancel};
  color:  ${props => props.theme.colorStyled.ColoraBtnCancel};
  &:hover{
    opacity: .7;
  }
  i {
    font-size: 1em;
    margin-right: .35em;
  }
`;

export const ButtonDefault = styled(Button)`
  min-width: 7.25em;
  height: 2.25em;
  padding: 0;
  border-radius: ${props => props.theme.borderRadius.borderBtnSmall};
  border: 1px solid ${props => props.theme.colorStyled.ColorSecond};
  background: ${props => props.theme.colorStyled.ColorWhite};
  color:  ${props => props.theme.colorStyled.ColorSecond};
  font-size: ${props => props.theme.fontSize.SmallFontSize};
  padding: .35em 1em;
  :disabled {
    background: ${props => props.theme.colorStyled.ColorXXXLightGrey};
    color:  ${props => props.theme.colorStyled.ColoraBtnCancel};
    border: 1px solid ${props => props.theme.colorStyled.ColorXXXLightGrey};
  }
  &:hover{
    opacity: .7;
  }
  i {
    font-size: 1em;
    margin-right: .35em;
  }
`;

export const ButtonPrimary = styled(Button)`
  min-width: 6.25em;
  height: 2.25em;
  padding: 0;
  border-radius: ${props => props.theme.borderRadius.borderBtnSmall};
  border: 1px solid ${props => props.theme.colorStyled.ColorBgDefault};
  background: ${props => props.theme.colorStyled.ColorBgDefault};
  color:  ${props => props.theme.colorStyled.ColorWhite};
  font-size: ${props => props.theme.fontSize.SmallFontSize};
  padding: .35em 1em;
  :disabled {
    background: ${props => props.theme.colorStyled.ColorXXXLightGrey};
    color:  ${props => props.theme.colorStyled.ColoraBtnPrimaryDisabled};
    border: 1px solid ${props => props.theme.colorStyled.ColorXXXLightGrey};
    cursor: not-allowed;
  }
  &:hover{
    opacity: .7;
  }
  i {
    font-size: 1em;
    margin-right: .35em;
  }
`;
export const ButtonApprove = styled(ButtonPrimary)`
  background: ${props => props.theme.colorStyled.ColorBgDefault};
  color:  ${props => props.theme.colorStyled.ColorWhite}; 
`;
export const ButtonReject = styled(ButtonPrimary)`
  background: ${props => props.theme.colorStyled.ColorXXXLightGrey};
  color:  ${props => props.theme.colorStyled.ColoraBtnCancel};
  border: 1px solid ${props => props.theme.colorStyled.ColorXXXLightGrey};
`;

export const ButtonSubmit = styled(Button).attrs({
  type: 'submit',
})`
  width: 7.250em;
  min-width: 6.25em;
  height: 2.438em;
  padding: 0;
  border-radius: ${props => props.theme.borderRadius.borderBtnSmall};
  border: 1px solid ${props => props.theme.colorStyled.ColorBgDefault};
  background: ${props => props.theme.colorStyled.ColorBgDefault};
  color:  ${props => props.theme.colorStyled.ColorWhite};
  &:hover{
    opacity: .7;
  }
  i {
    font-size: 1em;
    margin-left: .35em;
  }
  :disabled {
    border: 1px solid ${props => props.theme.colorStyled.ColoraBtnCancel};
    background: ${props => props.theme.colorStyled.ColorXXXLightGrey};
    color:  ${props => props.theme.colorStyled.ColoraBtnPrimaryDisabled};
    cursor: not-allowed;
  }
`;

export const LoginBtn = styled.button`
  cursor: pointer;
  height: 3.75em;
  width: 100%;
  border-radius: 3.75em;
  border: 1px solid ${props => props.theme.colorStyled.ColorBlack};
  transition: 0.3s ease;
  background: ${props => props.theme.colorStyled.ColorBlack};
  color: ${props => props.theme.colorStyled.ColorWhite};  
  margin-top: 1.5em;
  display: flex;
  font-size: ${props => props.theme.fontSize.BaseFontSize};
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${props => props.theme.colorStyled.ColorWhite};
    color: ${props => props.theme.colorStyled.ColorBlack};
  }
`;

export const LoginFBBtn = styled(LoginBtn)`
  border: 1px solid ${props => props.theme.colorStyled.ColorBtnFb};
  background: ${props => props.theme.colorStyled.ColorBtnFb};
  color: ${props => props.theme.colorStyled.ColorWhite};
  margin-bottom: 1.5em;
  i {
    margin-right: 0.313em;
    font-size: ${props => props.theme.fontSize.HeadingH6FontSize};
  }
  &:hover {
    background: ${props => props.theme.colorStyled.ColorWhite};
    color: ${props => props.theme.colorStyled.ColorBtnFb};
  }
`;

export const LoginFooter = styled.div`
  text-align: center;  
`;

export const LoginFooterText = styled.span`
  font-size: ${props => props.theme.fontSize.MediumFontSize};
`;

export const LoginFooterLink = styled(Link)`
  font-size: ${props => props.theme.fontSize.MediumFontSize};
  margin-left: .5em;
  text-decoration: none;
  color: ${props => props.theme.colorStyled.ColorBlack};
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.colorStyled.ColorBgDefaultHover};
  }
`;

export const LoginSpinner = styled.div`
  border: 2px solid;
  width: 0.938em;
  height: 0.938em;
  border-radius: 50%;
  border-color: black black black transparent;
  animation: ${spin} 2s linear infinite;
  margin-right: .5em;
  display: inline-block;
`;

export const LoginErrorMessage = styled.div`
  color: crimson;
  text-align: center;
  margin-bottom: 0.938em;
`;
