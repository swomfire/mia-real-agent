import styled from 'styled-components';

export const CreditCardWrapper = styled.div`
  border: 1px solid ${props => props.selected
    ? props.theme.colorStyled.ColorPrimary : '#cecece'};
  border-radius: 5px;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 1px 1px 1px #cecece;
  margin: 5px;
  font-size: 1.3em;
  cursor: pointer;
  button {
    position: absolute;
    right: 1.5em;
    min-width: 1px;
    padding: .35em .55em;
    i {
      margin-right: 0;
    }
  }
  label {
    margin-right: 1em;
    .ant-checkbox:hover {
      outline-color: ${props => props.theme.colorStyled.ColorPrimary}; 
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${props => props.theme.colorStyled.ColorPrimary};
      border-color: ${props => props.theme.colorStyled.ColorPrimary};
    }
    .ant-checkbox-checked::after{
      border-color: ${props => props.theme.colorStyled.ColorPrimary};
    }
  }
`;

const selectCreditCardType = (type) => {
  const path = '/assets/images/credit-card/Light/';
  switch (type) {
    default: return `${path}1.png`;
  }
};

export const CreditCardType = styled.img.attrs(props => ({
  src: selectCreditCardType(props.type),
}))`
  width: 3em;
  margin-right: 1em;
`;

export const AddCreditCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: .5em;
  button {
    font-size: 1em;
  }
`;

export const CreditCardTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
