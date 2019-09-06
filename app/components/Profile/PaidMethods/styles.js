import styled from 'styled-components';

export const PaidMethodWrapper = styled.div`

`;

export const CreditTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 1.1em;
    font-weight: 600;
  }
  button {
    margin-left: 1em;
    position: absolute;
    right: 0;
    font-size: 1em;
  }
`;

export const BillingHistory = styled.div``;

export const BillingHistoryWrapper = styled.div`
  height: calc(100vh - 40em);
`;

export const NoHistoryWrapper = styled.div`
  height: calc(100vh - 40em);
  display: flex;
  align-items: center;
  justify-content: center;
`;
