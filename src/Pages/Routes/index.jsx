import { Route, Switch } from "react-router-dom"
import Login from "./../../components/Login"
import Register from "../../components/Register"
import Home from  './../Home'
import Dashboard from "./../../components/Dashboard"
import { useEffect, useState } from "react"



    const Routes = () => {
        const [auth, setAuth] = useState(false)

        useEffect(() => {

            const token = JSON.parse(localStorage.getItem("@KenzieHub:token"))
            if(token){
                setAuth(true)
            }

        },[])

        return (
            <Switch>
                <Route exact path = "/register">
                <Register auth = {auth} />
                </Route>
                <Route exact path = "/login">
                    <Login auth = {auth} setAuth = {setAuth} />
                </Route>
                <Route exact path = "/dashboard">
                    <Dashboard auth = {auth} setAuth = {setAuth} />
                </Route>
                <Route exact path = "/">
                    <Home auth = {auth} />
                </Route>
            </Switch>
        )
   
   
   
    }


    export default Routes

