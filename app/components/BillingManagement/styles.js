import styled from 'styled-components';

export const BoldText = styled.span`
  font-weight: 600;
  margin-left: .2em;
`;

export const MoneyText = styled.span`
  color: ${props => props.theme.colorStyled.ColorBgDefault};
  font-weight: 600;
`;

export const AddText = styled.span`
  color: ${props => props.theme.colorStyled.ColorSusscess};
  font-weight: 600;
`;

export const MinusText = styled.span`
  color: ${props => props.theme.colorStyled.ColorIconHover};
  font-weight: 600;
`;
