import styled from 'styled-components';

export const ResponseItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1em 1.5em;
  border-top: 1px solid ${props => props.theme.colorStyled.ColorBorder};
`;

export const ResponseParameterWrapper = styled.div`
  margin-right: .75em;

`;

export const ResponseValueWrapper = styled.div`
 flex: 0 0 100%; 
`;

export const ResponseActionWrapper = styled.div`
  font-size: ${props => props.theme.fontSize.BaseFontSize};
  
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
