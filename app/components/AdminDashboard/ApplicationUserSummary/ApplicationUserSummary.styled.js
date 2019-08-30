import styled, { css } from 'styled-components';

export const TicketActivityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colorStyled.ColorBorder};
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`;

export const TicketActivityLeftItem = styled.div`
  flex: 1;
  padding: 30px 35px;
  position: relative;
  @media (max-width: 1024px) {
    padding: 15px 20px;
  }
`;

export const TicketActivityRightItem = styled.div`
  flex: 0 0 50%;
  padding: 30px 35px 30px 40px;
  border-left: 1px solid ${props => props.theme.colorStyled.ColorBorder};
  @media (max-width: 1024px) {
    flex: 0 0 100%;
    padding: 15px 20px;
  }
`;

export const TicketActivityTitle = styled.div`
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

export const TicketActivityItem = styled.div`
  flex: 1;
  text-align: center;
  width: 22%;
  margin-right: 20px;
  padding: 7px;
  height: 120px;
  border: 1px solid #dae1e4;
  border-radius: 7px;
  background-color: ${props => props.theme.colorStyled.ColorWhite};
  cursor: pointer;
  &:hover {
    border: 1px solid #ff5402;
  }
  &:last-child {
    margin-right: 0px;
  }
`;

export const TicketActivityGroupItem = styled.div`
  display: flex;
  justify-content: space-between;

  & ${TicketActivityItem}:last-child {
    margin-right: 0px;
  }
`;

export const TicketActivityNumber = styled.div`
  font-size: 36px;
  ${({ color }) => color
    && css`
      color: ${color};
    `};
`;

export const TicketActivityUnit = styled.div`
  font-size: 11px;
  color: #8d99ae;
  text-transform: capitalize;
`;

export const TicketActivityPurpose = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin-top: 10px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    border: 1px solid #747474;
    border-radius: 100%;
    margin-right: 5px;
    padding: 2px;
    font-size: 7px;
  }
`;

export const TicketDetailPercent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text {
    font-size: ${props => props.theme.fontSize.MediumFontSize};
  }
`;

export const TicketDetailGroupActiveItem = styled.div`
  flex: 0 0 40%;
  text-align: center;
`;
