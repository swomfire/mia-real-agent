import styled from 'styled-components';

export const AddCreditCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .StripeElement {
    flex: auto;
    margin-right: 10px;
  }
`;

export const ErrorWrapper = styled.h2`
  color: ${props => props.theme.colorStyled.ColorIconHover};
`;
