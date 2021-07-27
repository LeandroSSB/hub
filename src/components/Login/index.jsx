import { Grid, Paper, TextField, Button } from "@material-ui/core"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useState } from "react";
import {Form, Error } from './style'
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";




    const Login = ({auth, setAuth }) => {
        const [password, setPassword] = useState(true)
        const handlePassword = () => setPassword(!password)
        const schema = yup.object().shape({
            email: yup.string().email("Precisa ser um email").required("Campo Obrigatorio"),
            password: yup.string().min(6, "minimo 6 caracteres").required("Campo obrigatorio"),
        })
        const history = useHistory()
        const {
            register,
            handleSubmit,
            formState: { errors }
        } = useForm({resolver: yupResolver(schema) })
        const onSubmit = ({email, password}) => {
            const user = {
                email,
                password,
            }
            
            axios.post("https://kenziehub.me/sessions", {...user})
            .then((res) => {
                const { token } = res.data
                const { id } = res.data.user
                localStorage.setItem("@KenzieHub:id", JSON.stringify(id))
                localStorage.setItem("@KenzieHub:token", JSON.stringify(token))
                history.push("/dashboard")
                setAuth(true)
            })
            
            .catch((err) => toast.error("Email ou senha incorreta", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }
                ) )

                
        }
        
            if(auth){
                return <Redirect to="/dashboard"  />
            }
            
        return (
            
            <Grid container justifyContent = "center" align = "center">
                <Grid item xs = {3}>
                    <Paper>
                        <h1> Login </h1>
                        <Form onSubmit = {handleSubmit(onSubmit)}>
                            <TextField error = {errors.email? true : false} label ="Email" {... register("email")} />
                                <Error>{errors.email?.message}</Error>
                            <TextField error = {errors.password? true : false} label = "Senha" {... register("password")} type = {password? "password" : "text"} 
                            InputProps = {{ 
                                endAdornment: password? 
                                <VisibilityOffIcon onClick = {handlePassword}/>
                                : 
                                <VisibilityIcon onClick = {handlePassword}/> }}
                                />
                                <Error>{errors.password?.message}</Error>                                                      
                            <Button type ="submit" variant ="outlined"> Login </Button>
                        </Form>
                    </Paper>
                </Grid>
            </Grid>
        
        )
    }

    export default Login