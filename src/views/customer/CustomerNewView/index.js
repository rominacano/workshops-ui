import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import CustomerNewForm from './CustomerNewForm';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerNewView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Customer New">
      <Container maxWidth={false}>
        <Header />
      </Container>
      <Box mt={3}>
        <Container maxWidth="lg">
          <CustomerNewForm />
        </Container>
      </Box>
    </Page>
  );
};

export default CustomerNewView;
