import { AppBar, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { Title, Bar } from "./styles";
import { useAuth } from "../../providers/Auth";

const Header = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const { auth } = useAuth();
  return (
    <AppBar>
      <Bar>
        <Title onClick={() => history.push("/")}> KenzieHub </Title>
        {auth && (
          <IconButton>
            <ExitToAppIcon onClick={() => logout()} />
          </IconButton>
        )}
      </Bar>
    </AppBar>
  );
};

export default Header;
