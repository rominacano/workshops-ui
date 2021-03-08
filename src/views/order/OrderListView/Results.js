import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import Label from 'src/components/Label';

const getStatusLabel = paymentStatus => {
  const map = {
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

  const { text, color } = map[paymentStatus];

  return <Label color={color}>{text}</Label>;
};

const applyPagination = (orders, page, limit) => {
  return orders.slice(page * limit, page * limit + limit);
};

const useStyles = makeStyles(() => ({
  root: {}
}));

const Results = ({ className, orders, ...rest }) => {
  const classes = useStyles();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = event => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedOrders = applyPagination(orders, page, limit);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {orders.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(orders.length / limit)}
      </Typography>
      <Card>
        <CardHeader title="Orders" />
        <Divider />
        <PerfectScrollbar>
          <Box minWidth={1150}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Car</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.map(order => {
                  const isOrderSelected = selectedOrders.includes(order.id);

                  return (
                    <TableRow
                      key={order.id}
                      selected={selectedOrders.indexOf(order.id) !== -1}
                    >
                      <TableCell>
                        {order.id}
                        <Typography variant="body2" color="textSecondary">
                          {moment(order.createdAt).format(
                            'DD MMM YYYY | hh:mm'
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>{order.car.patent}</TableCell>
                      <TableCell>{order.description}</TableCell>
                      <TableCell>
                        {numeral(order.totalAmount).format(`$0,0.00`)}
                      </TableCell>
                      <TableCell>{getStatusLabel(order.status)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={orders.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array.isRequired
};

Results.defaultProps = {
  orders: []
};

export default Results;
