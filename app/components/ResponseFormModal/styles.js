import styled from 'styled-components';
import { Modal } from 'antd';

export const ModalStyled = styled(Modal)`
  width: 800px !important;
`;

export const ErrorMessage = styled.h2`
  color: red;
`;

export const ParameterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
`;

export const ParameterTitle = styled.div`
  margin-right: .5em;
  flex: 0 0 10%;
`;

export const ParameterValue = styled.div`
  margin-right: .5em;
  font-weight: 600;
  flex: 0 0 30%;
`;

export const ParameterFormActionGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.5em;
  height: 4em;
  i:hover{
    color: ${props => props.theme.colorStyled.ColorPrimary};
  }
`;
