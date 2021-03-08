import React, { useState, useCallback, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import CarNewForm from './CarNewForm';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CarNewView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Car New">
      <Container maxWidth={false}>
        <Header />
      </Container>
      <Box mt={3}>
        <Container maxWidth="lg">
          <CarNewForm />
        </Container>
      </Box>
    </Page>
  );
};

export default CarNewView;
