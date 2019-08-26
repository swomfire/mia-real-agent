import styled from 'styled-components';
import { Button } from 'antd';

export const IntentPageWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const IntentManagementWrapper = styled.div`
 flex: 0 0 350px;
`;
export const IntentDetailWrapper = styled.div`
 flex: auto;
`;

export const IntentHeaderWrapper = styled.div`
  padding: 10px;
  background: #dfdfdf;
  position: relative;
  h2 {
    text-align: center;
    font-weight: 600;
  }
`;

export const AddResponseButton = styled(Button)`
  position: absolute !important;
  top: 7px;
  right: 15px;
`;

export const PleaseSelectIntent = styled.div`
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
