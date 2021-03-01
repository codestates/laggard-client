import React from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const GuestModal: React.FC = () => {
  const [value, setValue] = React.useState('female');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <div>
      <GuestModalContainer>
        <Card>
          <FormControl className="form" component="fieldset">
            <FormLabel className="gender" component="legend">
              성별
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="남" />
              <FormControlLabel value="female" control={<Radio />} label="여" />
            </RadioGroup>
          </FormControl>
          <p>
            나이 : <input />
          </p>
          <div className="button">
            <button>시작하기</button>
          </div>
        </Card>
      </GuestModalContainer>
    </div>
  );
};

export default GuestModal;

const GuestModalContainer = styled.div`
  display: flex;
`;

const Card = styled.div`
  width: 200px;
  min-height: 200px;
  background-color: rgba(191, 191, 191, 0.8);
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-content: space-around;

  .button {
    display: flex;
    justify-content: center;
  }
  .gender {
    color: black;
  }
  > p {
    margin-bottom: 4px;
  }
  > p input {
    width: 5rem;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  > p input:focus {
    outline: none;
  }

  .button button {
    width: 5rem;
  }
`;
