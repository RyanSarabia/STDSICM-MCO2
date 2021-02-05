/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { DateTimePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import LinearProgress from '@material-ui/core/LinearProgress';

const datefns = new DateFnsUtils();

export default function CreateForm() {
  const [redirect, setRedirect] = useState(false);
  const [id, setID] = useState();
  const [image, setImage] = useState({});
  const [previewSource, setPreviewSource] = useState();
  const [loading, setLoading] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  const {
    register,
    setError,
    clearErrors,
    errors,
    handleSubmit,
    formState,
    control,
    getValues,
    trigger,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
  });

  const previewFile = (file) => {
    setPreviewSource(URL.createObjectURL(file));
  };

  const isImage = (filename) => {
    // Get Extension
    const parts = filename.split('.');
    const ext = parts[parts.length - 1];
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'png':
        return true;
      default:
        return false;
    }
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (isImage(file.name)) {
        setHasImage(true);
        clearErrors('image');
        previewFile(file);
        setImage(file);
      } else {
        setPreviewSource('');
        setImage('');
        setError('image', {
          type: 'manual',
          message: 'Only accepting jpg/jpeg, png, gif, bmp. Please try again.',
        });
      }
    }
  };

  // Put here DB stuff to save input
  const onSubmit = (data) => {
    trigger().then((res) => {
      setLoading(true);
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
        axios.post('/upload', form).then((res2) => {
          setID(res2.data._id);
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

  const triggerValidate = () => {
    trigger('stealPrice');
  };

  // Does not work with floating point, javascript problem
  const validateStealPrice = () => {
    const values = getValues(['stealPrice', 'startPrice', 'increment']);
    const nSteal = parseInt(values.stealPrice, 10);
    const nStart = parseInt(values.startPrice, 10);
    const nIncrement = parseInt(values.increment, 10);

    if (nSteal <= nStart) {
      return nSteal > nStart || 'Must be greater than start price.';
    }

    return (nSteal - nStart) % nIncrement === 0 || 'Must be consistent with increment';
  };

  /* eslint-disable */

  return (
    <>
      {redirect ? (
        <Redirect to={`/auction/${id}`} />
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
                    id="id-title-field"
                    label="Title"
                    name="title"
                    variant="filled"
                    fullWidth
                    required
                    inputProps={{ maxLength: '30' }}
                    inputRef={register({
                      required: 'This field is required.',
                    })}
                    helperText={<ErrorMessage errors={errors} name="title" id="id-title-error" />}
                    error={!!errors.title}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="id-description-field"
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
                    helperText={
                      <ErrorMessage errors={errors} name="description" id="id-description-error" />
                    }
                    error={!!errors.description}
                  />
                </Grid>

                <Grid item>
                  <Controller
                    as={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <DateTimePicker
                        id="id-cutoff-field"
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
                        helperText={
                          <ErrorMessage errors={errors} name="cutoff" id="id-cutoff-error" />
                        }
                        error={!!errors.cutoff}
                      />
                    }
                    defaultValue={null}
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
                    id="id-startprice-field"
                    label="Starting Price"
                    name="startPrice"
                    variant="filled"
                    fullWidth
                    required
                    onBlur={triggerValidate}
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
                    helperText={
                      <ErrorMessage errors={errors} name="startPrice" id="id-startprice-error" />
                    }
                    error={!!errors.startPrice}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="id-increment-field"
                    label="Increment"
                    name="increment"
                    variant="filled"
                    fullWidth
                    required
                    defaultValue={1}
                    onBlur={triggerValidate}
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
                    helperText={
                      <ErrorMessage errors={errors} name="increment" id="id-increment-error" />
                    }
                    error={!!errors.increment}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="id-stealprice-field"
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
                    helperText={
                      <ErrorMessage errors={errors} name="stealPrice" id="id-stealprice-error" />
                    }
                    error={!!errors.stealPrice}
                  />
                </Grid>

                <Grid item>
                  <Button variant="contained" component="label" id="id-upload-button">
                    Upload File *
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      required
                      hidden
                    />
                  </Button>
                  {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
                </Grid>

                <Grid item container alignItems="center" justify="center">
                  {previewSource ? (
                    <img
                      src={previewSource}
                      alt="Item"
                      style={{ maxWidth: '20vh' }}
                      id="id-upload-image"
                    />
                  ) : (
                    <div
                      style={{
                        border: '1px solid gray',
                        width: '100%',
                        textAlign: 'center',
                        padding: '0 8px 0 8px',
                      }}
                    >
                      <p>No image uploaded</p>
                    </div>
                  )}
                </Grid>
              </Grid>

              <Grid container item xs={12} alignItems="center" style={{ marginTop: '2vh' }}>
                <Button
                  id="id-post-button"
                  color="primary"
                  variant="contained"
                  disabled={!formState.isValid || !hasImage || loading}
                  type="submit"
                >
                  Post
                </Button>
                <LinearProgress
                  id="id-progressbar"
                  color="primary"
                  style={{ marginTop: '20px', width: '100%' }}
                  hidden={!loading}
                />
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </>
  );
  /* eslint-enable */
}

// {
//   new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'PHP',
//   })
// }
