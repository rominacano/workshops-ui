import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { createCar } from 'src/api/cars';
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CarNewForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const params = useParams();
  const customerId = params['customerId'];

  return (
    <Formik
      initialValues={{
        patent: '',
        brand: '',
        year: '',
        engine: '',
        chassis: ''
      }}
      validationSchema={Yup.object().shape({
        patent: Yup.string()
          .max(15)
          .required('Patent is required'),
        brand: Yup.string()
          .max(255)
          .required('Brand is required'),
        year: Yup.number().required('Year is required'),
        engine: Yup.string().max(100),
        chassis: Yup.string().max(60)
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        try {
          // NOTE: Make API request
          await createCar({ ...values, customerId });
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Car created', {
            variant: 'success',
            action: (
              <Button
                onClick={() => {
                  history.push(`/app/management/customers/${customerId}`);
                }}
              >
                See all
              </Button>
            )
          });
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.patent && errors.patent)}
                    fullWidth
                    helperText={touched.patent && errors.patent}
                    label="Patent"
                    name="patent"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.patent}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.brand && errors.brand)}
                    fullWidth
                    helperText={touched.brand && errors.brand}
                    label="Brand"
                    name="brand"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.brand}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.carModel && errors.carModel)}
                    fullWidth
                    helperText={touched.carModel && errors.carModel}
                    label="Model"
                    name="carModel"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.carModel}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.year && errors.year)}
                    fullWidth
                    helperText={touched.year && errors.year}
                    label="Year"
                    name="year"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.year}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.engine && errors.engine)}
                    fullWidth
                    helperText={touched.engine && errors.engine}
                    label="Engine number"
                    name="engine"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.engine}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.chassis && errors.chassis)}
                    fullWidth
                    helperText={touched.chassis && errors.chassis}
                    label="Chassis number"
                    name="chassis"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.chassis}
                    variant="outlined"
                  />
                </Grid>
                <Grid item />
              </Grid>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Create Car
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
};

CarNewForm.propTypes = {
  className: PropTypes.string
};

export default CarNewForm;
