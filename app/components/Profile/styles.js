import styled from 'styled-components';
import { Row } from 'antd';

export const ProfileWrapper = styled.div`
  height: calc(100vh - 200px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-height: 736px) {
    height: 100%;
  }
`;

export const ProfileCard = styled.div`
  width: 720px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 3px 10px 3px #e7e7e7;
  padding: 30px 50px;
  color: ${props => props.theme.colorStyled.ColorBlack};
`;

export const ProfileTitle = styled.div`
  text-align: center;
  font-size: 32px;
  margin-bottom: 15px;
`;

export const InputStyled = styled.div`
  width: 100% !important;
  height: 27.5px !important;
  border: 0 !important;
  padding-top: .2em !important;
  padding-left: .5em !important;
  outline: 0 none !important;  
  transition: border-color .2s linear !important;
  border-bottom: 1px solid ${props => props.theme.colorStyled.ColorBorder} !important;
  color: ${props => props.theme.colorStyled.ColorBlack};
  font-weight: 600;
  border-radius: 0 !important;  
  :focus {
    box-shadow: none !important;
  }
`;

export const InputLabelStyled = styled.div`
  color: ${props => props.theme.colorStyled.ColorBlack};
  label{
    float: left;
    ::after{
      content: '' !important;
    }
  }
`;

export const RowStyled = styled(Row)`
  margin-bottom: 25px;
`;

export const ActionBar = styled.div`
  button{
    float: right;
    margin-left: 10px;
    font-size: 1em;
  }
`;

export const ProfileContentWrapper = styled.div`
  padding-top: 1em;
`;
