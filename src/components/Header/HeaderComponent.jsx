import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DrawerComp from "./Drawer";
import { useUserContext } from "../../utils/UserContext";



const HeaderComponent = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  
  const username = localStorage.getItem('username');
  const { logOut } = useUserContext();

  const titlechange = () => {
    if(username)
    {
        return "Deconnexion";
    }

    else return "Connexion";
}


  const connexion = () => {

    if(username)
    {
      logOut();
    }
    navigate("/");
  }

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#111827 " }}>
        <Toolbar>
          <AutoGraphIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "1.2rem", paddingLeft: "10%" }}>
                Gestion de patrimoine
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="primary"
                textColor="white"
                value={value}
                onChange={(e, value) => setValue(value)}
                
              >
                <Tab onClick={() => navigate("/dashboard")} label="Accueil" value={0} defaultChecked disabled={!username}/>
                <Tab onClick={() => navigate("/investments")} label="Portefeuille" value={1} disabled={!username} />
                <Tab onClick={() => navigate("/calculator")} label="Calcul intèrêts composés" value={2} disabled={!username}/>
              </Tabs>
              <Button sx={{ marginLeft: "auto" }} variant="contained" onClick={connexion}>
              {titlechange()}
              </Button>

            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default HeaderComponent;
