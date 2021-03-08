import React, { useCallback, useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';
import { getAllOrders } from 'src/api/orders';
import { useParams } from 'react-router-dom';
import { getOrdersByCar } from 'src/api/cars';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const OrderListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [orders, setOrders] = useState([]);
  const params = useParams();
  const carId = params['carId'];

  const getOrders = useCallback(async () => {
    try {
      let response;
      if (!carId) {
        response = await getAllOrders();
      } else {
        response = await getOrdersByCar(carId);
      }
      if (isMountedRef.current) {
        setOrders(response.data.repairs);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <Page className={classes.root} title="Orders List">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results orders={orders} />
        </Box>
      </Container>
    </Page>
  );
};

export default OrderListView;
