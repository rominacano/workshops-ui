import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import CustomerInfo from './CustomerInfo';
import Cars from './Cars';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Details = ({ customer, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <CustomerInfo customer={customer.details} />
      </Grid>
      <Grid item lg={8} md={6} xl={9} xs={12}>
        <Cars cars={customer.cars} />
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default Details;
