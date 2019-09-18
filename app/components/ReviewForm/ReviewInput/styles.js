import styled from 'styled-components';
import { InputStyled } from '../../FormInput/styles';

export const ReviewInputWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: .5em;
  user-select: none;  
`;

export const ReviewInputValueWrapper = styled.div`
  flex: 0 0 70%;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
  }
`;

export const ReviewInputTitle = styled.div`
  font-weight: 600;
  padding: .5em;
  flex: 0 0 30%;
  border-right: 1px solid ${props => props.theme.colorStyled.ColorXXXLightGrey};
  margin-right: 1em;
`;

export const ReviewInputValue = styled.div`
  flex: 0 0 90%;
  > div {
    width: fit-content;
    padding: .5em;
    color: ${props => props.isRequest && !props.isUpload
    ? props.theme.colorStyled.ColorWhite
    : props.theme.colorStyled.ColorBlackGrey};
    background-color: ${props => props.isRequest && !props.isUpload
    ? props.theme.colorStyled.ColorBgDefault
    : props.theme.colorStyled.ColorWhite};
    border-radius: .5em;
    .ant-upload-list-picture-card .ant-upload-list-item {
      border-color: ${props => props.isRequest && props.isUpload
    ? props.theme.colorStyled.ColorBgDefault
    : props.theme.colorStyled.ColorGrey};
    }
  }
  .ant-upload-list-picture-card .ant-upload-list-item-info{
    width: 100%;
  }
  .ant-upload-list-picture-card {
    margin-left: -.5em;
  }
`;

export const ReviewInputAction = styled.div`
  flex: 0 0 10%;
  padding: .5em;
  margin-left: .1em;
  i {
    font-size: 1.2em;
    :hover {
      cursor: pointer;
      color: ${props => props.theme.colorStyled.ColorBgDefault}
    }
  }
`;

export const CommentWrapper = styled.div`
  padding: .5em 0;
  margin-top: .2em;
  flex: 1;
  display: flex;
`;

export const CommentInput = styled(InputStyled)`
  flex: 0 0 90%;
  border: 1px solid ${props => props.theme.colorStyled.ColorXXXLightGrey};
  padding: .5em;
  border-radius: .5em 0 0 .5em;
`;

export const CommentAction = styled.div`
  flex: 0 0 auto;
  button {
    height: 100%;
    width: 100%;
    min-width: 1em;
    border-radius: 0 .5em .5em 0;
    i {
      margin-right: 0;
    }
  }
`;

export const CommentDisplayWrapper = styled.div`
  align-items: center;
  margin: .5em;
  border-top: 1px solid;
  padding: .5em 0px;
  position: relative;
  flex: 0 0 93.5%;
  i {
    margin-right: .5em;
    cursor: unset;
  }
  .comment-action {
    position: absolute;
    right: 0;
    margin-right: .1em;
    font-size: 1.4em;
    :hover {
      cursor: pointer;
      color: ${props => props.theme.colorStyled.ColorBgDefault}
    }
  }
`;
