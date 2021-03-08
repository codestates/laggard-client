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
} from '../features/messageSlice';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CorrectWrongMessages: React.FC = () => {
  const correct = useSelector(selectCorrect);
  const wrong = useSelector(selectWrong);
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
    </div>,
    document.body,
  );
};

export default CorrectWrongMessages;
