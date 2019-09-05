import styled from 'styled-components';

export const CreditCardWrapper = styled.div`
  border: 1px solid #cecece;
  border-radius: 5px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 1px #cecece;
  margin: 5px;
  font-size: 1.3em;
  cursor: pointer;
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

export const AddCreditCardWrapper = styled(CreditCardWrapper)`
  padding: 1.2em;
  font-size: 1em;
  font-weight: 600;
`;
