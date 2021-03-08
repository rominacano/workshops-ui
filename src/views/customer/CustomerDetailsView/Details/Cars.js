import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Typography,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import {
  PlusCircle as PlusCircleIcon,
  ArrowRight as ArrowRightIcon
} from 'react-feather';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const Cars = ({ cars, className, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Cars" />
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patent</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Engine</TableCell>
            <TableCell>Chassis</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map(car => {
            return (
              <TableRow hover key={car.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <div>
                      <Typography variant="body2" color="textSecondary">
                        {car.patent}
                      </Typography>
                    </div>
                  </Box>
                </TableCell>
                <TableCell>{car.brand}</TableCell>
                <TableCell>{car.carModel}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.engine}</TableCell>
                <TableCell>{car.chassis}</TableCell>
                <TableCell align="right">
                  <IconButton
                    component={RouterLink}
                    to={`/app/management/orders/${car.id}`}
                  >
                    <SvgIcon fontSize="small">
                      <ArrowRightIcon />
                    </SvgIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            history.push(`/app/management/customers/${cars[0].customer}/car`);
          }}
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          New Car
        </Button>
      </Box>
    </Card>
  );
};

Cars.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default Cars;
