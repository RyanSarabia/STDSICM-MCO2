import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

export default function CreateForm() {
  const [cutoff, setCutoff] = useState(new Date());

  const [image, setImage] = useState({});

  const [setRedirect] = useState(false);

  const { register, errors, handleSubmit, formState } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
  };

  // Put here DB stuff to save input
  const onSubmit = (data) => {
    const form = new FormData();
    form.append('file', image);
    form.append('title', data.title);
    form.append('description', data.description);
    form.append('startPrice', data.startPrice);
    form.append('incPrice', data.increment);
    form.append('stealPrice', data.stealPrice);
    console.log(data);
    console.log(form);
    axios.post('/upload', form).then((res2) => {
      console.log(res2.data);
      setRedirect(true);
    });
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
          style={{ padding: '3vh' }}
        >
          <Grid container item xs={7} direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="Title"
                name="title"
                variant="filled"
                // value={auctionDetails.title}
                // onChange={handleChange}
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
                // onChange={handleChange}
                // value={auctionDetails.description}
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
                name="cutoffdate"
                onChange={setCutoff}
                value={cutoff}
                required
                variant="inline"
                inputVariant="filled"
                fullWidth
                ampm={false}
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
                // onChange={handleChange}
                // value={auctionDetails.startPrice}
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
                // onChange={handleChange}
                // value={auctionDetails.increment}
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
                // onChange={handleChange}
                // value={auctionDetails.stealPrice}
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
              Upload File
              <input
                type="file"
                name="image"
                onChange={handleImageUpload}
                accept="image/*"
                required
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} alignItems="center" style={{ marginTop: '2vh' }}>
            <Button color="primary" variant="contained" disabled={!formState.isValid} type="submit">
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
