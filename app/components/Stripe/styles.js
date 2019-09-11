import styled from 'styled-components';
import { Row } from 'antd';

export const AddCreditCardWrapper = styled(Row)`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ErrorWrapper = styled.h2`
  color: ${props => props.theme.colorStyled.ColorIconHover};
`;
