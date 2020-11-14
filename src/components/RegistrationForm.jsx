import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function RegistrationForm() {
  return (
    <form>
      <Grid
        container
        direction="column"
        spacing={1}
      >
        <Grid item>
          <TextField
            label="Contact Number"
            variant="filled"
            fullWidth
            required
            inputProps={{ maxlength: '15' }}
          />
        </Grid>

        <Grid item>
          <TextField
            multiline
            label="Bio"
            variant="filled"
            fullWidth
            rows={3}
            rowsMax={6}
            inputProps={{ maxlength: '140' }}

          />
        </Grid>

        <Grid item>
          <Button color="primary" variant="contained"> Confirm </Button>
        </Grid>
      </Grid>
    </form>
  );
}
