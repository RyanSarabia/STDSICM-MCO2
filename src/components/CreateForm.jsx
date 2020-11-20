import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

export default function CreateForm() {
  const [cutoff, setCutoff] = useState(new Date());

  const { register, errors, handleSubmit, formState } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  // Put here DB stuff to save input
  const onSubmit = (data) => {
    console.log(data);
  };

  // Trying to register cutoff date. Not working...
  // register({ name: 'cutoff', type: 'text' }, { required: 'This field is required.' });

  return (
    <Paper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          spacing={2}
          style={{ marginTop: '15vh', padding: '3vh' }}
        >
          <Grid container item xs={7} direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="Title"
                name="title"
                variant="filled"
                fullWidth
                required
                inputProps={{ maxLength: '30' }}
                inputRef={register({
                  required: 'This field is required.',
                })}
                helperText={<ErrorMessage errors={errors} name="title" />}
                error={!!errors.title}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Description"
                name="description"
                variant="filled"
                rows={3}
                rowsMax={12}
                fullWidth
                required
                multiline
                inputProps={{ maxLength: '500', style: { fontSize: 'small' } }}
                inputRef={register({
                  required: 'This field is required.',
                })}
                helperText={<ErrorMessage errors={errors} name="description" />}
                error={!!errors.description}
              />
            </Grid>

            <Grid item>
              {/* FIX THIS PART DI NAGRREGISTER SA REACT HOOK FORM */}
              <KeyboardDateTimePicker
                name="cutoff"
                required
                variant="inline"
                inputVariant="filled"
                fullWidth
                ampm={false}
                value={cutoff}
                onChange={setCutoff}
                label="Cut-off Date and Time"
                format="yyyy/MM/dd HH:mm"
                disablePast
                helperText={<ErrorMessage errors={errors} name="cutoff" />}
                error={!!errors.cutoff}
              />
            </Grid>
          </Grid>

          <Grid container item xs={5} direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="Starting Price"
                name="startPrice"
                variant="filled"
                fullWidth
                required
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps={{
                  startAdornment: <InputAdornment position="start"> Php </InputAdornment>,
                }}
                inputRef={register({
                  required: 'This field is required.',
                  pattern: {
                    value: /^[0-9]+([.][0-9]{1,2})?$/,
                    message: 'Input a valid currency value.',
                  },
                })}
                helperText={<ErrorMessage errors={errors} name="startPrice" />}
                error={!!errors.startPrice}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Increment"
                name="increment"
                variant="filled"
                fullWidth
                required
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps={{
                  startAdornment: <InputAdornment position="start"> Php </InputAdornment>,
                }}
                inputRef={register({
                  required: 'This field is required.',
                  pattern: {
                    value: /^[0-9]+([.][0-9]{1,2})?$/,
                    message: 'Input a valid currency value.',
                  },
                })}
                helperText={<ErrorMessage errors={errors} name="increment" />}
                error={!!errors.increment}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Steal Price"
                name="stealPrice"
                variant="filled"
                fullWidth
                required
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps={{
                  startAdornment: <InputAdornment position="start"> Php </InputAdornment>,
                }}
                inputRef={register({
                  required: 'This field is required.',
                  pattern: {
                    value: /^[0-9]+([.][0-9]{1,2})?$/,
                    message: 'Input a valid currency value.',
                  },
                })}
                helperText={<ErrorMessage errors={errors} name="stealPrice" />}
                error={!!errors.stealPrice}
              />
            </Grid>

            <Grid item>
              {/* IDK PANO MAGUPLOAD NG FILE */}
              <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden />
              </Button>
            </Grid>
          </Grid>

          <Grid container item xs={12} alignItems="center" style={{ marginTop: '2vh' }}>
            <Button
              onClick={onSubmit}
              color="primary"
              variant="contained"
              disabled={!formState.isValid}
              type="submit"
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

// {
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'PHP',
//   })
// }
