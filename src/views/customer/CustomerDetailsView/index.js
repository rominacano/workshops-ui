import React, { useCallback, useState, useEffect } from 'react';
import { Box, Container, Divider, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Details from './Details';
import { useParams } from 'react-router-dom';
import { getCustomerById } from 'src/api/customers';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerDetailsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [customer, setCustomer] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');
  const params = useParams();

  const customerId = params['customerId'];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getCustomer = useCallback(async () => {
    try {
      const response = await getCustomerById(customerId);

      if (isMountedRef.current) {
        setCustomer(response.data.customer);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  if (!customer) {
    return null;
  }

  return (
    <Page className={classes.root} title="Customer Details">
      <Container maxWidth={false}>
        <Header customer={customer.details} />
        <Divider />
        <Box mt={3}>
          <Details customer={customer} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerDetailsView;
