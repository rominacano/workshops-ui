import React, { useState, useCallback, useEffect } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
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
import { createOrder } from 'src/api/orders';
import { getAllCustomers, getCarsByCustomerId } from 'src/api/customers';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ORDERS_STATUS = {
  canceled: {
    text: 'Canceled',
    color: 'error'
  },
  completed: {
    text: 'Completed',
    color: 'success'
  },
  pending: {
    text: 'Pending',
    color: 'warning'
  },
  rejected: {
    text: 'Rejected',
    color: 'error'
  }
};

const OrderNewForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [cars, setCars] = useState();
  const [customers, setCustomers] = useState();

  const getCustomers = useCallback(async () => {
    try {
      const response = await getAllCustomers();

      if (isMountedRef.current) {
        setCustomers(response.data.customers);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const getCarsByCustomer = async customerId => {
    const response = await getCarsByCustomerId(customerId);
    setCars(response.data.cars);
  };

  return (
    <Formik
      initialValues={{
        type: '',
        description: '',
        status: '',
        totalAmount: '',
        carId: {}
      }}
      validationSchema={Yup.object().shape({
        type: Yup.string()
          .max(60)
          .required('Type is required'),
        description: Yup.string()
          .max(255)
          .required('Description is required'),
        status: Yup.string().required('Status is required'),
        totalAmount: Yup.number().required('Total amount is required'),
        car: Yup.object().required('Car is required')
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        try {
          await createOrder({ ...values, carId: values.carId.id });
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Order created', {
            variant: 'success',
            action: (
              <Button
                onClick={() => {
                  history.push('/app/management/orders');
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
        setFieldValue,
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
                  <Autocomplete
                    id="customer"
                    name="customer"
                    getOptionLabel={customer => customer.document}
                    options={customers || []}
                    value={values.customer}
                    onChange={(e, value) => {
                      setFieldValue('carId', {});
                      if (value) getCarsByCustomer(value.id);
                    }}
                    renderInput={params => (
                      <TextField
                        fullWidth
                        label="Customer"
                        name="customer"
                        required
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    id="carId"
                    name="carId"
                    getOptionLabel={car => car.patent}
                    options={cars || []}
                    value={values.carId}
                    onChange={(e, value) => setFieldValue('carId', value)}
                    renderInput={params => (
                      <TextField
                        fullWidth
                        label="Car"
                        name="carId"
                        required
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.type && errors.type)}
                    fullWidth
                    helperText={touched.type && errors.type}
                    label="Type"
                    name="type"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.type}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.description && errors.description)}
                    fullWidth
                    helperText={touched.description && errors.description}
                    label="Description"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.description}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.status && errors.status)}
                    fullWidth
                    helperText={touched.status && errors.status}
                    label="Status"
                    name="status"
                    onBlur={handleBlur}
                    onChange={event => {
                      setFieldValue('status', event.target.value);
                    }}
                    select
                    SelectProps={{ native: true }}
                    value={values.status}
                    variant="outlined"
                  >
                    <option key={'none'} value={''}>
                      {''}
                    </option>
                    {Object.keys(ORDERS_STATUS).map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.totalAmount && errors.totalAmount)}
                    fullWidth
                    helperText={touched.totalAmount && errors.totalAmount}
                    type="number"
                    label="Total Amount"
                    name="totalAmount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.totalAmount}
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
                  Create Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
};

OrderNewForm.propTypes = {
  className: PropTypes.string
};

export default OrderNewForm;
