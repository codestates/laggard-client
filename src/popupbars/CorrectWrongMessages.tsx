import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import {
  closeCorrect,
  closeWrong,
  selectCorrect,
  selectWrong,
  selectDecreaseChance,
  closeDecreaseChance,
  selectServerError,
  closeServerError,
  selectAlreadySigned,
  closeAlreadySigned,
  selectInvalidUser,
  closeInvalidUser,
  selectInvalidBirthYear,
  closeInvalidBirthYear,
  selectRecordPoints,
  closeRecordPoints,
} from '../features/messageSlice';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CorrectWrongMessages: React.FC = () => {
  const correct = useSelector(selectCorrect);
  const wrong = useSelector(selectWrong);
  const decreaseChance = useSelector(selectDecreaseChance);
  const serverError = useSelector(selectServerError);
  const alreadySigned = useSelector(selectAlreadySigned);
  const invalidUser = useSelector(selectInvalidUser);
  const invalidBirthYear = useSelector(selectInvalidBirthYear);
  const recordPoints = useSelector(selectRecordPoints);
  const dispatch = useDispatch();

  return ReactDOM.createPortal(
    <div>
      <Snackbar
        open={correct}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(closeCorrect());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeCorrect());
          }}
          severity="success"
        >
          정답입니다!
        </Alert>
      </Snackbar>
      <Snackbar
        open={wrong}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(closeWrong());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeWrong());
          }}
          severity="error"
        >
          틀렸습니다!
        </Alert>
      </Snackbar>
      <Snackbar
        open={decreaseChance}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(closeDecreaseChance());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeDecreaseChance());
          }}
          severity="error"
        >
          기회가 1회 감소했습니다!
        </Alert>
      </Snackbar>
      <Snackbar
        open={serverError}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(closeServerError());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeServerError());
          }}
          severity="error"
        >
          서버에 오류가 발생 했습니다
        </Alert>
      </Snackbar>
      <Snackbar
        open={alreadySigned}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(closeAlreadySigned());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeAlreadySigned());
          }}
          severity="error"
        >
          이미 가입한 계정입니다
        </Alert>
      </Snackbar>
      <Snackbar
        open={invalidUser}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(closeInvalidUser());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeInvalidUser());
          }}
          severity="error"
        >
          권한이 없습니다. 다시 로그인해주세요
        </Alert>
      </Snackbar>
      <Snackbar
        open={invalidBirthYear}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(closeInvalidBirthYear());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeInvalidBirthYear());
          }}
          severity="error"
        >
          출생연도를 올바르게 입력해주세요
        </Alert>
      </Snackbar>
      <Snackbar
        open={recordPoints}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(closeRecordPoints());
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={() => {
            dispatch(closeRecordPoints());
          }}
          severity="success"
        >
          점수 저장이 되었습니다!
        </Alert>
      </Snackbar>
    </div>,
    document.body,
  );
};

export default CorrectWrongMessages;
