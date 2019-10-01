import styled from 'styled-components';

export const ResponseItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1em 1.5em;
  border-top: 1px solid ${props => props.theme.colorStyled.ColorBorder};
`;

export const ResponseParameterWrapper = styled.div`
  margin-right: .75em;
  width: 40%;
`;

export const ResponseValueWrapper = styled.div`
 flex: 0 0 100%; 
`;

export const ResponseActionWrapper = styled.div`
  font-size: ${props => props.theme.fontSize.BaseFontSize};
  display: flex;
  padding-top: 1em;
  justify-content: space-around;
  width: 5%;
  .mia-edit{
    margin-right: .5em;
    &:hover{
      color:  ${props => props.theme.colorStyled.ColorBgDefault};
    }
  }
   .mia-close{
    &:hover{
      color:  ${props => props.theme.colorStyled.ColorWarming};
    }
  }
`;

export const ParameterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
`;

export const ParameterTitle = styled.div`
  margin-right: .5em;
  flex: 0 0 20%;
`;

export const ParameterValue = styled.div`
  margin-right: .5em;
  font-weight: 600;
  flex: 0 0 50%;
`;
