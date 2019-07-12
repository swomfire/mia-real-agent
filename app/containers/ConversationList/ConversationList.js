import { connect } from 'react-redux';
import ConversationList from 'components/ConversationList';
import { getUserRole } from 'reducers/auth';
import {
  isFetchingList,
  getTotalConverations,
  selectConversation,
  getConverationList,
} from '../../reducers/conversations';

const mapStateToProps = state => ({
  userRole: getUserRole(state),
  isFetchingList: isFetchingList(state),
  total: getTotalConverations(state),
  conversationList: getConverationList(state),
});

const mapDispatchToProps = {
  selectConversation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);
