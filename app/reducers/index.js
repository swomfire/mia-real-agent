/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import profile from './profile';
import ticket from './ticket';
import ticketWarning from './ticketWarning';
import modal from './modal';
import application from './application';
import history from '../utils/history';
import user from './user';
import admin from './admin';
import system from './system';
import conversations from './conversations';
import replies from './replies';
import requests from './requests';
import response from './response';
import intent from './intent';
import cannedResponse from './cannedResponse';

export const REHYDRATE_COMPLETE = 'root/REHYDRATE_COMPLETE';
export const CLEAR_TRANSACTION = 'root/CLEAR_TRANSACTION';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth,
    profile,
    ticket,
    ticketWarning,
    modal,
    user,
    intent,
    admin,
    application,
    system,
    conversations,
    replies,
    requests,
    response,
    cannedResponse,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  return rootReducer;
}
