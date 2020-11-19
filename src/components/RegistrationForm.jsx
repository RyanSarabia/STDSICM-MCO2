import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from '../../node_modules/axios';

export default function RegistrationForm() {
  const {
    register,
    errors,
    handleSubmit,
    formState,
  } = useForm({ criteriaMode: 'all', mode: 'onChange' });

  // Place DB save call in this function
  const onSubmit = (data) => {
    axios.post('/registration', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="column"
        spacing={1}
      >
        <Grid item>
          <TextField
            label="Contact Number"
            name="contact"
            variant="filled"
            fullWidth
            required
            inputProps={{ maxLength: '15' }}
            inputRef={register({ required: 'This field is required.', pattern: { value: /^[0-9+]+$/, message: 'Only 0-9 and + symbols allowed.' } })}
            helperText={<ErrorMessage errors={errors} name="contact" />}
          />
        </Grid>
        <Grid item>
          <TextField
            multiline
            name="bio"
            label="Bio"
            variant="filled"
            fullWidth
            rows={3}
            rowsMax={6}
            inputProps={{ maxLength: '140' }}
            inputRef={register}

          />
        </Grid>

        <Grid item>
          <Button color="primary" variant="contained" disabled={!formState.isValid} type="submit"> Confirm </Button>
        </Grid>
      </Grid>
    </form>
  );
}
