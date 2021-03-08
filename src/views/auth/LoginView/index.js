import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
import Logo from "src/components/Logo";
import JWTLogin from "./JWTLogin";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    minHeight: 400,
  },
  currentMethodIcon: {
    height: 40,
    "& > img": {
      width: "auto",
      maxHeight: "100%",
    },
  },
}));

const LoginView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Login">
      <Container className={classes.cardContainer} maxWidth="sm">
        <Box mb={8} display="flex" justifyContent="center">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography color="textPrimary" gutterBottom variant="h2">
                  Sign in
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sign in on the internal platform
                </Typography>
              </div>
            </Box>
            <Box flexGrow={1} mt={3}>
              <JWTLogin />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default LoginView;
