import { Redirect, useHistory } from "react-router-dom";
import { Button, Paper } from "@material-ui/core";

import { Container, useStyles } from "./style";

const Home = ({ auth }) => {
  const history = useHistory();
  const handlePath = (path) => history.push(path);
  const themes = useStyles();

  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Paper className={themes.paper}>
        <h1> Bem vindos ao KenzieHub !</h1>
        <Button variant="outlined" onClick={() => handlePath("/login")}>
          Login
        </Button>
        <Button variant="outlined" onClick={() => handlePath("/register")}>
          Criar nova conta
        </Button>
      </Paper>
    </Container>
  );
};

export default Home;
