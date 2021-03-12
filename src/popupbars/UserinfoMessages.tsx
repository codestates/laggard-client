import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeNicknameFailure,
  closeNicknameSuccess,
  closePasswordFailure,
  closePasswordSuccess,
  selectChangeNicknameFailure,
  selectChangeNicknameSuccess,
  selectChangePasswordFailure,
  selectChangePasswordSuccess,
} from '../features/messageSlice';
import ReactDOM from 'react-dom';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserinfoMessages: React.FC = () => {
  const nicknameChangeSuccess = useSelector(selectChangeNicknameSuccess);
  const nicknameChangeFailure = useSelector(selectChangeNicknameFailure);
  const passwordChangeSuccess = useSelector(selectChangePasswordSuccess);
  const passwordChangeFailure = useSelector(selectChangePasswordFailure);
  const dispatch = useDispatch();

  return ReactDOM.createPortal(
    <div>
      <Snackbar
        open={nicknameChangeSuccess}
        autoHideDuration={5000}
        onClose={() => {
          dispatch(closeNicknameSuccess());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeNicknameSuccess());
          }}
          severity="success"
        >
          닉네임이 변경되었습니다.
        </Alert>
      </Snackbar>
      <Snackbar
        open={nicknameChangeFailure}
        autoHideDuration={5000}
        onClose={() => {
          dispatch(closeNicknameFailure());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeNicknameFailure());
          }}
          severity="error"
        >
          닉네임 변경에 실패하셨습니다.
        </Alert>
      </Snackbar>
      <Snackbar
        open={passwordChangeSuccess}
        autoHideDuration={5000}
        onClose={() => {
          dispatch(closePasswordSuccess());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closePasswordSuccess());
          }}
          severity="success"
        >
          비밀번호가 변경되었습니다.
        </Alert>
      </Snackbar>
      <Snackbar
        open={passwordChangeFailure}
        autoHideDuration={5000}
        onClose={() => {
          dispatch(closePasswordFailure());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closePasswordFailure());
          }}
          severity="error"
        >
          비밀번호는 8자 이상, 숫자가 포함 되어야합니다.
        </Alert>
      </Snackbar>
    </div>,
    document.body,
  );
};

export default UserinfoMessages;
