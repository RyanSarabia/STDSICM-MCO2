import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

export default function CreateForm() {
  return (
    <Paper>
      <Grid container>
        <Grid item>
          <TextField
            label="Contact Number"
            name="contact"
            variant="filled"
            fullWidth
            required
            inputProps={{ maxLength: '15' }}
            inputRef={register({
              required: 'This field is required.',
              pattern: { value: /^[0-9+]+$/, message: 'Only 0-9 and + symbols allowed.' },
            })}
            helperText={<ErrorMessage errors={errors} name="contact" />}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
