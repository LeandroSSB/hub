import { Redirect, useHistory } from "react-router-dom"
import { Grid, Paper, Button, TextField, MenuItem } from "@material-ui/core"
import axios from "axios"
import { useState } from "react"

        const Dashboard = ({auth}) => {
            const history = useHistory()
            const handleLogout = () => {
                localStorage.clear()
                history.push("/")
            }

            
            const [name, setName] = useState("")
            const [skill, setSkill] = useState("")

            const skillLevel =  ["Iniciante", "Intermediário", "Avançado"]

            const handleSubmit = (name, skill) => {
                const newCard = {
                    name,
                    skill
                }

                axios.post("https://kenziehub.me/users/techs", newCard )
            }

            if(!auth){
                return <Redirect to ="/"/>
            }
            return (
                <Grid container justifyContent = "center" align = "center">
                    <Grid item xs = {9} >
                        <Paper elevation = {3}>
                            <h2> Criar tecnologias </h2>
                            < TextField label = "Tecnologia" onChange = {(e) => setName(e.target.value)} />
                            < TextField label = "Nivel tecnico "select onChange = {(e) => setSkill(e.target.value)}> 
                            { skillLevel.map((a,b) => <MenuItem value = {a} key = {b} > {a} </MenuItem>) }
                            </TextField>
                            <Button onClick = {() => handleSubmit(name, skill)}> Adicionar </Button>
                            <Button variant = "outlined" onClick = { handleLogout }> Deslogar? </Button>
                        </Paper>
                    </Grid>
                </Grid>
            )
        }
        export default Dashboard