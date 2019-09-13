import { connect } from 'react-redux';
import ConvertRate from '../../components/ConvertRate';
import { getSystem, updateSystemAction, getSystemIsUpdating, getSystemUpdateError } from '../../reducers/system';

const mapStateToProps = state => ({
  system: getSystem(state),
  isUpdating: getSystemIsUpdating(state),
  updateError: getSystemUpdateError(state),
});

const mapDispatchToProps = {
  updateSystem: updateSystemAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConvertRate);
