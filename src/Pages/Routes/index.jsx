import { Route, Switch } from "react-router-dom"
import Register from "../../components/Register"
import Home from  './../Home'




    const Routes = () => {
        return (
            <Switch>
                <Route exact path = "/register">
                <Register/>
                </Route>
                <Route exact path = "/login">

                </Route>
                <Route exact path = "/tech">

                </Route>
                <Route exact path = "/">
                    <Home/>
                </Route>
            </Switch>
        )
   
   
   
    }


    export default Routes

