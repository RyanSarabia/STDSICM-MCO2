import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { DateTimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';

const datefns = new DateFnsUtils();

export default function CreateForm() {
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState({});
  const [previewSource, setPreviewSource] = useState();

  const { register, errors, handleSubmit, formState, control, getValues, trigger } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    previewFile(file);
    setImage(file);
  };

  // Put here DB stuff to save input
  const onSubmit = (data) => {
    trigger().then((res) => {
      // Returns true if no errors
      if (res) {
        // const form = {
        //   file: image,
        //   title: data.title,
        //   description: data.description,
        //   startPrice: data.startPrice,
        //   incPrice: data.increment,
        //   stealPrice: data.stealPrice,
        //   postDate: datefns.date(),
        // };
        const form = new FormData();
        form.append('file', image);
        form.append('title', data.title);
        form.append('description', data.description);
        form.append('startPrice', data.startPrice);
        form.append('incPrice', data.increment);
        form.append('stealPrice', data.stealPrice);
        form.append('cutoffdate', data.cutoff);
        form.append('postDate', datefns.date());
        console.log(data);
        console.log(form);
        axios.post('/user/upload', form).then((res2) => {
          console.log(res2.data);
          setRedirect(true);
        });
      }
    });
  };

  const validateDate = (date) => {
    // Comparing it to the millisecond
    // console.log(datefns.getDiff(date, datefns.date()) > 3600000);
    return (
      datefns.getDiff(date, datefns.date()) > 3600000 ||
      'Must be at least an hour away from current time.'
    );
  };

  // Does not work with floating point, javascript problem
  const validateStealPrice = (stealPrice) => {
    const values = getValues(['startPrice', 'increment']);
    const nSteal = parseInt(stealPrice, 10);
    const nStart = parseInt(values.startPrice, 10);
    const nIncrement = parseInt(values.increment, 10);

    if (nSteal < nStart) {
      return nSteal > nStart || 'Must be greater than start price.';
    }

    return (nSteal - nStart) % nIncrement === 0 || 'Must be consistent with increment';
  };

  return (
    <>
      {redirect ? (
        <Redirect to="/auction" />
      ) : (
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
                  <Controller
                    as={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <DateTimePicker
                        required
                        variant="inline"
                        inputVariant="filled"
                        fullWidth
                        autoOk
                        // value={cutoff}
                        // onChange={setCutoff}
                        label="Cut-off Date and Time"
                        // format="yyyy/MM/dd HH:mm"
                        minutesStep={5}
                        disablePast
                        helperText={<ErrorMessage errors={errors} name="cutoff" />}
                        error={!!errors.cutoff}
                      />
                    }
                    defaultValue={datefns.date()}
                    control={control}
                    name="cutoff"
                    rules={{
                      required: 'This field is required.',
                      validate: validateDate,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={5} direction="column" spacing={2} alignItems="flex-start">
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
                        // value: /^[0-9]+([.][0-9]{1,2})?$/,
                        value: /^[0-9]+$/,
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
                    defaultValue={1}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{
                      startAdornment: <InputAdornment position="start"> Php </InputAdornment>,
                    }}
                    inputRef={register({
                      required: 'This field is required.',
                      pattern: {
                        // value: /^[0-9]+([.][0-9]{1,2})?$/,
                        value: /^[0-9]+$/,
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
                        // value: /^[0-9]+([.][0-9]{1,2})?$/,
                        value: /^[0-9]+$/,
                        message: 'Input a valid currency value.',
                      },
                      validate: validateStealPrice,
                    })}
                    helperText={<ErrorMessage errors={errors} name="stealPrice" />}
                    error={!!errors.stealPrice}
                  />
                </Grid>

                <Grid item>
                  <Button variant="contained" component="label">
                    Upload File
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageUpload}
                      accept="image/*"
                      required
                      hidden
                    />
                  </Button>
                </Grid>

                <Grid item>
                  <Container>
                    {previewSource && (
                      <img src={previewSource} alt="Item" style={{ maxWidth: '20vh' }} />
                    )}
                  </Container>
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
      )}
    </>
  );
}

// {
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'PHP',
//   })
// }
