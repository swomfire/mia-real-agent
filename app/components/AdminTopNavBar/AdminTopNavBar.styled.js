import styled from 'styled-components';

export const HeaderAdminStyled = styled.div`
  position: relative;
  width: 100%;  
  z-index: 1;
  display: flex;
`;

export const TopbarRightAdmin = styled.div`
  display: flex;
  flex: 1;
  height:  ${props => props.theme.heightSite.heightHeadAdmin};
`;
export const UserNameAdmin = styled.span`
  color: ${props => props.theme.colorStyled.ColorWhite};
  margin-left: 0.4em;
  
`;
export const ProfileStyled = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0px 1em;
  flex: 0 0 calc(100% - 2em);
  border-bottom: 1px solid ${props => props.theme.colorStyled.ColorXLightGrey};
  position: relative;
`;

export const ProfileImageStyled = styled.img`
  height: 30px;
  cursor: pointer;
`;

export const LogoutStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin: 0px 10px;
`;

export const ActionsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    line-height: 21px;
    font-size: ${props => props.theme.fontSize.HeadingH5FontSize};
    margin-left: 15px;
    cursor: pointer;
    &:hover {
      color: #41a0d9;
    }
  }
`;

export const SettingIcon = styled.i``;

export const TopNavBarSerachWrapper = styled.div`
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 320px;
  height: 32px;
  display: flex;
  align-items: center;
  i {
    padding: 3px 7px 3px 10px;
    margin: 4px 0px;
    font-size: ${props => props.theme.fontSize.BaseFontSize};
    cursor: pointer;
    border-right: 1px solid #ccc;
    &:hover {
      color: #222;
    }
  }
  input {
    padding-left: 10px;
    width: 100%;
    font-size: ${props => props.theme.fontSize.MediumFontSize};
    color: #222;
  }
  &:focus,
  &:hover {
    border: 1px solid #41a0d9;
  }
`;
