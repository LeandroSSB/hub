import { Redirect, useHistory } from "react-router-dom"
import { Grid, Paper, Button, TextField, MenuItem } from "@material-ui/core"
import axios from "axios"
import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useEffect } from "react"
import { toast } from "react-toastify"


const useStyles = makeStyles((theme) => ({
    
    paper: {
      padding: theme.spacing(5),
      display: "flex",
      flexFlow: "column wrap",
      color: theme.palette.text.primary
    },

    button: {
        margin: "5px",
    },
    list: {
        color: "red",
        display: "flex",
        alignItems: "center",
        flexFlow: "column wrap",
        background: "orange",
        margin: "10px",
        borderRadius: "0.75rem",
       
    },
    item:{
        display: "flex",
        flexFlow: "column",
        textAlign: "center",
        
        
    }

  }));




        const Dashboard = ({auth, setAuth}) => {
            const classes = useStyles()
            const history = useHistory()


            const handleLogout = () => {
                localStorage.clear()
                setAuth(!auth)
                history.push("/login")
            }

            const [att, setAtt] = useState(false)
            const [name, setName] = useState("")
            const [skill, setSkill] = useState("")

            const skillLevel =  ["Iniciante", "Intermediário", "Avançado"]


                const token = JSON.parse(localStorage.getItem("@KenzieHub:token"))
                const config = { headers: { Authorization: `Bearer ${token}` } }

            const handleSubmit = (name, skill) => {
                const user = {
                    title: name,
                    status: skill
                }
                axios.post("https://kenziehub.me/users/techs",
                    user
                 , config)
                .catch((err) => alert(err)).then((_) => setAtt(!att))

                
            }

            const handleDelete = (json) => {
                const id = json
                
                axios.delete(`https://kenziehub.me/users/techs/${id}`, config )
                .then((_) => toast.success(" Deletado com sucesso! ", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,}))
                .then((_) => setAtt(!att))
                .catch((err) => alert(err))
            }
            
            const [techs, setTechs ] = useState([])
            const id = JSON.parse(localStorage.getItem("@KenzieHub:id"))

            useEffect(() => {
                axios.get(`https://kenziehub.me/users/${id}`)
                .then((res) => res.data.techs).then((res) => setTechs(res))
            },[att])
            
            
            
            if(!auth){
                return <Redirect to ="/"/>
            }
            return (
                <Grid container  alignItems = "center" align = "center" direction = "column"  >
                    <Grid  item = {true} xs = {2} >
                        <Paper className = {classes.paper} elevation = {3}>
                            <h2> Criar tecnologias </h2>
                            < TextField label = "Tecnologia" onChange = {(e) => setName(e.target.value)} />
                            < TextField label = "Nivel tecnico "select onChange = {(e) => setSkill(e.target.value)}> 
                            { skillLevel.map((a,b) => <MenuItem value = {a} key = {b} > {a} </MenuItem>) }
                            </TextField>
                            <Button className = {classes.button} variant = "outlined" onClick = {() => handleSubmit(name, skill)}> Adicionar </Button>
                            <Button className = {classes.button} variant = "outlined" onClick = { handleLogout }> Deslogar? </Button>
                        </Paper>
                    </Grid>

                    <Grid item = {true}  >
                        <div className = {classes.paper} >
                            <ul className = {classes.list}>
                                {techs.map((a, b) => <li className = {classes.item} key = {b} > 
                                    <h4>{a.title}</h4>
                                    <h5>{a.status}</h5>
                                    <Button variant = "outlined" onClick= {() => handleDelete(a.id)}> Apagar? </Button>
                                </li>)}
                            </ul>
                        </div>
                    </Grid>

                </Grid>
            )
        }
        export default Dashboard