/* eslint-disable no-underscore-dangle */
import {
  fromJS, Set as ISet,
} from 'immutable';
export const SAVE_SUPPORT = 'supports/SAVE_SUPPORT';
export const REMOVE_SUPPORT = 'supports/REMOVE_SUPPORT';


export const AGENTS_FIND_SUPPORT = 'supports/AGENTS_FIND_SUPPORT';
export const AGENTS_FIND_SUPPORT_SUCCESS = 'supports/AGENTS_FIND_SUPPORT_SUCCESS';
export const AGENTS_FIND_SUPPORT_FAILED = 'supports/AGENTS_FIND_SUPPORT_FAILED';

export const AGENT_NEW_SUPPORT = 'chat/AGENT_NEW_SUPPORT';

export const AGENT_CONFIRM = 'supports/AGENT_CONFIRM_SUPPORT';
export const AGENT_CONFIRM_SUCCESS = 'supports/AGENT_CONFIRM_SUPPORT_SUCCESS';
export const AGENT_CONFIRM_FAIL = 'supports/AGENT_CONFIRM_SUPPORT_FAIL';

export const REQUEST_END_SUPPORT = 'supports/REQUEST_END_SUPPORT';
export const REQUEST_END_SUPPORT_SUCCESS = 'supports/REQUEST_END_SUPPORT_SUCCESS';
export const REQUEST_END_SUPPORT_FAIL = 'supports/REQUEST_END_SUPPORT_FAIL';

export const CONFIRM_END_SUPPORT = 'supports/CONFIRM_END_SUPPORT';
export const CONFIRM_END_SUPPORT_SUCCESS = 'supports/CONFIRM_END_SUPPORT_SUCCESS';
export const CONFIRM_END_SUPPORT_FAIL = 'supports/CONFIRM_END_SUPPORT_FAIL';

// action creator
export const requestEndSupport = (conversationId, status) => ({
  type: REQUEST_END_SUPPORT,
  payload: {
    conversationId,
    status,
  },
});

export const requestEndSupportSuccess = conversationId => ({
  type: REQUEST_END_SUPPORT_SUCCESS,
  payload: {
    conversationId,
  },
});

export const requestEndSupportFailed = error => ({
  type: REQUEST_END_SUPPORT_FAIL,
  payload: {
    error,
  },
});

export const confirmEndSupport = (conversationId, status) => ({
  type: CONFIRM_END_SUPPORT,
  payload: {
    conversationId,
    status,
  },
});

export const confirmEndSupportSuccess = conversationId => ({
  type: CONFIRM_END_SUPPORT_SUCCESS,
  payload: {
    conversationId,
  },
});

export const confirmEndSupportFailed = error => ({
  type: CONFIRM_END_SUPPORT_FAIL,
  payload: {
    error,
  },
});

export const removeSupport = ticketId => ({
  type: REMOVE_SUPPORT,
  payload: {
    ticketId,
  },
});

export const findAgentSupport = ticketId => ({
  type: AGENTS_FIND_SUPPORT,
  payload: {
    ticketId,
  },
});

export const findAgentSupportSuccess = ticketId => ({
  type: AGENTS_FIND_SUPPORT_SUCCESS,
  payload: {
    ticketId,
  },
});

export const findAgentSupportFailed = (ticketId, error) => ({
  type: AGENTS_FIND_SUPPORT_FAILED,
  payload: {
    ticketId,
    error,
  },
});

export const agentNewSupport = data => ({
  type: AGENT_NEW_SUPPORT,
  payload: {
    data,
  },
});

export const agentConfirmAction = (ticketId, isConfirm) => ({
  type: AGENT_CONFIRM,
  payload: {
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
const saveSupport = support => ({
  type: SAVE_SUPPORT,
  payload: {
    support,
  },
});

// selector
export const getSupportList = ({ supports }) => {
  const byId = supports.get('byId').toJS();
  const allIds = supports.get('allIds').toJS();
  return allIds.map(id => byId[id]);
};

export const getErrorMessage = ({ supports }, ticketId) => {
  if (!ticketId) return '';
  const error = supports.getIn(['error', ticketId]);
  if (!error) return '';

  return error;
};

export const isFindingAgent = ({ supports }, ticketId) => {
  if (!ticketId) return false;
  const isSupportingList = supports.get('isSupportingList');
  return isSupportingList.has(ticketId);
};

export const isWaitingForComfirm = ({ supports }) => supports.get('isWaitingForComfirm');
export const isSendingConfirmation = ({ supports }) => supports.get('isSendingConfirmation');
export const getSupportData = ({ supports }) => supports.get('supportData');
export const getSupportTotal = ({ supports }) => supports.get('total');

const initialState = fromJS({
  byId: {},
  allIds: [],
  total: 0,
  isSupportingList: new ISet(),
  error: {},
  isWaitingForComfirm: false,
  isSendingConfirmation: false,
  confirmationError: '',
  supportData: null,
});

function repliesReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SUPPORT: {
      const { support } = action.payload;
      const { _id } = support;
      const allIds = state.get('allIds').push(_id);

      return state
        .setIn(['byId', _id], support)
        .set('allIds', fromJS(allIds))
        .set('total', allIds.size);
    }

    case REMOVE_SUPPORT: {
      const { ticketId } = action.payload;
      const allIds = state.get('allIds').toJS();
      const newAllIds = allIds.filter(id => id !== ticketId);
      return state
        .removeIn(['byId', ticketId])
        .set('allIds', fromJS(newAllIds))
        .set('total', newAllIds.length);
    }

    case AGENTS_FIND_SUPPORT: {
      const { ticketId } = action.payload;
      const isSupportingList = state.get('isSupportingList').add(ticketId);
      const error = state.get('error').delete(ticketId);

      return state
        .set('isSupportingList', isSupportingList)
        .set('error', error);
    }

    case AGENTS_FIND_SUPPORT_SUCCESS: {
      const { ticketId } = action.payload;
      const isSupportingList = state.get('isSupportingList').remove(ticketId);

      return state
        .set('isSupportingList', isSupportingList);
    }

    case AGENTS_FIND_SUPPORT_FAILED: {
      const { error: errorMsg, ticketId } = action.payload;
      const isSupportingList = state.get('isSupportingList').remove(ticketId);
      const error = state.get('error').set(ticketId, errorMsg);

      return state
        .set('isSupportingList', isSupportingList)
        .set('error', error);
    }

    case AGENT_NEW_SUPPORT: {
      const { data } = action.payload;

      return state
        .set('isWaitingForComfirm', true)
        .set('supportData', data);
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
  saveSupport,
  removeSupport,

  findAgentSupport,
  findAgentSupportSuccess,
  findAgentSupportFailed,
  agentConfirmAction,
  agentConfirmSuccessAction,
  agentConfirmFailAction,

  requestEndSupport,
  requestEndSupportFailed,
  requestEndSupportSuccess,

  confirmEndSupport,
  confirmEndSupportFailed,
  confirmEndSupportSuccess,
};

export const selectors = {
  getSupportList,

  getErrorMessage,
  isFindingAgent,
};
