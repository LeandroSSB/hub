import { Grid, Paper, TextField, Button } from "@material-ui/core"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useState } from "react";
import {Form, Error } from './style'
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

    const Register = () => {
        const [password, setPassword] = useState(true)
        const handlePassword = () => setPassword(!password)
        const schema = yup.object().shape({
            email: yup.string().email("Precisa ser um email").required("Campo Obrigatorio"),
            password: yup.string().required("Campo obrigatorio"),
            confirmPassword: yup.string().oneOf([yup.ref('password'), null], "As senhas precisam coincidir").required("Campo obrigatorio"),
            name: yup.string().required("Campo obrigatorio"),
            bio: yup.string().required("Campo obrigatorio"),
            contact: yup.string().url("Precisa ser um link").required("Campo obrigatorio"),
            course_module: yup.string().required("Campo obrigatorio")
        })

        const {
            register,
            handleSubmit,
            formState: { errors }
        } = useForm({resolver: yupResolver(schema) })
        const onSubmit = (obj) => {
            const tratedObj = {
                email : obj.email,
                password: obj.password,
                name: obj.name,
                bio: obj.bio,
                contact: obj.contact,
                course_module: obj.course_module
            }
            axios.post("http://kenziehub.me/users", {...tratedObj})
            .then((res) => res)
            .catch((err) => console.log(err))
        }
        
        return (
            <Grid container justifyContent = "center" align = "center">
                <Grid item xs = {3}>
                    <Paper>
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
                        <TextField error = {errors.confirmPassword? true : false} label = "Confirmar Senha" {... register("confirmPassword")}/>
                            <Error>{errors.confirmPassword?.message}</Error>
                        <TextField error = {errors.name? true : false} label ="Nome" {... register("name")}/>
                            <Error>{errors.name?.message}</Error>
                        <TextField error = {errors.bio? true : false} label = "Bio" {... register("bio")}/>
                            <Error>{errors.bio?.message}</Error>
                        <TextField error = {errors.contact? true : false} label = "Contato" {... register("contact")}/>
                            <Error>{errors.contact?.message}</Error>
                        <TextField error = {errors.course_module? true : false} label = "Modulo do curso" {... register("course_module")}/>
                            <Error>{errors.course_module?.message}</Error>
                        <Button type ="submit" variant ="outlined"> Cadastrar </Button>
                        </Form>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    export default Register