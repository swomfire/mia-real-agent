/* eslint-disable no-underscore-dangle */
import _keyBy from 'lodash/keyBy';
import {
  fromJS, Set as ISet,
} from 'immutable';
export const SAVE_REQUEST = 'requests/SAVE_REQUEST';
export const REMOVE_REQUEST = 'requests/REMOVE_REQUEST';


export const AGENTS_FIND = 'requests/AGENTS_FIND';
export const AGENTS_FIND_SUCCESS = 'requests/AGENTS_FIND_SUCCESS';
export const AGENTS_FIND_FAILED = 'requests/AGENTS_FIND_FAILED';

export const AGENT_NEW_REQUEST = 'chat/AGENT_NEW_REQUEST';

export const AGENT_CONFIRM = 'chat/AGENT_CONFIRM';
export const AGENT_CONFIRM_SUCCESS = 'chat/AGENT_CONFIRM_SUCCESS';
export const AGENT_CONFIRM_FAIL = 'chat/AGENT_CONFIRM_FAIL';

// action creator

export const removeRequest = ticketId => ({
  type: REMOVE_REQUEST,
  payload: {
    ticketId,
  },
});

export const findAgentRequest = conversationId => ({
  type: AGENTS_FIND,
  payload: {
    conversationId,
  },
});

export const findAgentRequestSuccess = conversationId => ({
  type: AGENTS_FIND_SUCCESS,
  payload: {
    conversationId,
  },
});

export const findAgentRequestFailed = (conversationId, error) => ({
  type: AGENTS_FIND_FAILED,
  payload: {
    conversationId,
    error,
  },
});

export const agentNewRequest = data => ({
  type: AGENT_NEW_REQUEST,
  payload: {
    data,
  },
});

export const agentConfirmAction = (conversationId, ticketId, isConfirm) => ({
  type: AGENT_CONFIRM,
  payload: {
    conversationId,
    ticketId,
    isConfirm,
  },
});

// payload: {
//   ticketId,
//   owner,
//   isConfirm,
// }
export const agentConfirmSuccessAction = () => ({
  type: AGENT_CONFIRM_SUCCESS,
  payload: {
  },
});

export const agentConfirmFailAction = error => ({
  type: AGENT_CONFIRM_FAIL,
  payload: {
    error,
  },
});

// action creator
const saveRequest = request => ({
  type: SAVE_REQUEST,
  payload: {
    request,
  },
});

// selector
export const getRequestList = ({ requests }) => {
  const byId = requests.get('byId').toJS();
  const allIds = requests.get('allIds').toJS();
  return allIds.map(id => byId[id]);
};

export const getErrorMessage = ({ requests }, conversationId) => {
  if (!conversationId) return '';
  const error = requests.getIn(['error', conversationId]);
  if (!error) return '';

  return error;
};

export const isFindingAgent = ({ requests }, conversationId) => {
  if (!conversationId) return false;
  const isRequestingList = requests.get('isRequestingList');
  return isRequestingList.has(conversationId);
};

export const isWaitingForComfirm = ({ requests }) => requests.get('isWaitingForComfirm');
export const isSendingConfirmation = ({ requests }) => requests.get('isSendingConfirmation');
export const getRequestData = ({ requests }) => requests.get('requestData');
export const getRequestTotal = ({ requests }) => requests.get('total');

const initialState = fromJS({
  byId: {},
  allIds: [],
  total: 0,
  isRequestingList: new ISet(),
  error: {},
  isWaitingForComfirm: false,
  isSendingConfirmation: false,
  confirmationError: '',
  requestData: null,
});

function repliesReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_REQUEST: {
      const { request } = action.payload;
      const { _id } = request;
      const allIds = state.get('allIds').push(_id);

      return state
        .setIn(['byId', _id], request)
        .set('allIds', fromJS(allIds))
        .set('total', allIds.size);
    }

    case REMOVE_REQUEST: {
      const { ticketId } = action.payload;
      const allIds = state.get('allIds').toJS();
      const newAllIds = allIds.filter(id => id !== ticketId);
      return state
        .removeIn(['byId', ticketId])
        .set('allIds', fromJS(newAllIds))
        .set('total', newAllIds.length);
    }

    case AGENTS_FIND: {
      const { conversationId } = action.payload;
      const isRequestingList = state.get('isRequestingList').add(conversationId);
      const error = state.get('error').delete(conversationId);

      return state
        .set('isRequestingList', isRequestingList)
        .set('error', error);
    }

    case AGENTS_FIND_SUCCESS: {
      const { conversationId } = action.payload;
      const isRequestingList = state.get('isRequestingList').remove(conversationId);

      return state
        .set('isRequestingList', isRequestingList);
    }

    case AGENTS_FIND_FAILED: {
      const { error: errorMsg, conversationId } = action.payload;
      const isRequestingList = state.get('isRequestingList').remove(conversationId);
      const error = state.get('error').set(conversationId, errorMsg);

      return state
        .set('isRequestingList', isRequestingList)
        .set('error', error);
    }

    case AGENT_NEW_REQUEST: {
      const { data } = action.payload;

      return state
        .set('isWaitingForComfirm', true)
        .set('requestData', data);
    }

    case AGENT_CONFIRM: {
      return state
        .set('isSendingConfirmation', true);
    }

    case AGENT_CONFIRM_SUCCESS: {
      return state
        .set('isSendingConfirmation', false)
        .set('isWaitingForComfirm', false);
    }

    case AGENT_CONFIRM_FAIL: {
      const { error } = action.payload;
      return state
        .set('isSendingConfirmation', false)
        .set('confirmationError', error);
    }

    default: {
      return state;
    }
  }
}

export default repliesReducer;

export const actions = {
  saveRequest,
  removeRequest,

  findAgentRequest,
  findAgentRequestSuccess,
  findAgentRequestFailed,
  agentConfirmAction,
  agentConfirmSuccessAction,
  agentConfirmFailAction,
};

export const selectors = {
  getRequestList,

  getErrorMessage,
  isFindingAgent,
};
