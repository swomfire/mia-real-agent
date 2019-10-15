/* eslint-disable no-underscore-dangle */
import {
  fromJS, Set as ISet,
} from 'immutable';
export const SAVE_SUPPORT = 'supports/SAVE_SUPPORT';
export const REMOVE_SUPPORT = 'supports/REMOVE_SUPPORT';


export const AGENTS_FIND = 'supports/AGENTS_FIND';
export const AGENTS_FIND_SUCCESS = 'supports/AGENTS_FIND_SUCCESS';
export const AGENTS_FIND_FAILED = 'supports/AGENTS_FIND_FAILED';

export const AGENT_NEW_SUPPORT = 'chat/AGENT_NEW_SUPPORT';

export const AGENT_CONFIRM = 'supports/AGENT_CONFIRM_SUPPORT';
export const AGENT_CONFIRM_SUCCESS = 'supports/AGENT_CONFIRM_SUPPORT_SUCCESS';
export const AGENT_CONFIRM_FAIL = 'supports/AGENT_CONFIRM_SUPPORT_FAIL';

// action creator

export const removeSupport = ticketId => ({
  type: REMOVE_SUPPORT,
  payload: {
    ticketId,
  },
});

export const findAgentSupport = (conversationId, isConfirm) => ({
  type: AGENTS_FIND,
  payload: {
    conversationId,
    isConfirm,
  },
});

export const findAgentSupportSuccess = conversationId => ({
  type: AGENTS_FIND_SUCCESS,
  payload: {
    conversationId,
  },
});

export const findAgentSupportFailed = (conversationId, error) => ({
  type: AGENTS_FIND_FAILED,
  payload: {
    conversationId,
    error,
  },
});

export const agentNewSupport = data => ({
  type: AGENT_NEW_SUPPORT,
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

export const getErrorMessage = ({ supports }, conversationId) => {
  if (!conversationId) return '';
  const error = supports.getIn(['error', conversationId]);
  if (!error) return '';

  return error;
};

export const isFindingAgent = ({ supports }, conversationId) => {
  if (!conversationId) return false;
  const isSupportingList = supports.get('isSupportingList');
  return isSupportingList.has(conversationId);
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

    case AGENTS_FIND: {
      const { conversationId } = action.payload;
      const isSupportingList = state.get('isSupportingList').add(conversationId);
      const error = state.get('error').delete(conversationId);

      return state
        .set('isSupportingList', isSupportingList)
        .set('error', error);
    }

    case AGENTS_FIND_SUCCESS: {
      const { conversationId } = action.payload;
      const isSupportingList = state.get('isSupportingList').remove(conversationId);

      return state
        .set('isSupportingList', isSupportingList);
    }

    case AGENTS_FIND_FAILED: {
      const { error: errorMsg, conversationId } = action.payload;
      const isSupportingList = state.get('isSupportingList').remove(conversationId);
      const error = state.get('error').set(conversationId, errorMsg);

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
};

export const selectors = {
  getSupportList,

  getErrorMessage,
  isFindingAgent,
};
