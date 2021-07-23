    import { useHistory } from "react-router-dom"
    import { Button, Grid , Paper} from "@material-ui/core"

        const Home = () => {
            const history = useHistory()
            const handlePath = (path) => history.push(path) 

            return (
                <Grid container justifyContent = "center" align = "center" >
                    <Grid item  xs = {3}>
                        <Paper>
                            <h1> Bem vindos ao KenzieHub !</h1>
                            <Button variant = "outlined" onClick = {() => handlePath("/login")}> Login </Button>
                            <Button style ={{marginLeft:"20px"}} variant = "outlined" onClick = {() => handlePath("/register")}> Criar nova conta </Button>
                        </Paper>
                    </Grid>
                </Grid>

            )
        }

        export default Home 