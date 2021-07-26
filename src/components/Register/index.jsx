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
import { toast, ToastContainer } from "react-toastify";




    const Register = ({auth}) => {
        const [password, setPassword] = useState(true)
        const handlePassword = () => setPassword(!password)
        const schema = yup.object().shape({
            email: yup.string().email("Precisa ser um email").required("Campo Obrigatorio"),
            password: yup.string().min(6, "minimo 6 caracteres").required("Campo obrigatorio"),
            confirmPassword: yup.string().oneOf([yup.ref('password'), null], "As senhas precisam coincidir").required("Campo obrigatorio"),
            name: yup.string().required("Campo obrigatorio"),
            bio: yup.string().required("Campo obrigatorio"),
            contact: yup.string().required("Campo obrigatorio"),
            course_module: yup.string().required("Campo obrigatorio")
        })
        const history = useHistory()
        const {
            register,
            handleSubmit,
            formState: { errors }
        } = useForm({resolver: yupResolver(schema) })
        const onSubmit = ({email, password, name, bio, contact, course_module}) => {
            const tratedObj = {
                email,
                password,
                name,
                bio,
                contact,
                course_module
            }
            console.log(tratedObj)
            axios.post("https://kenziehub.me/users", {...tratedObj})
            .then((_) => {
                toast.success('Conta criada!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    return history.push("/login")
            })
            .catch((err) => toast.error(`${err}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }))


        }
        

        if (auth){
            return <Redirect to="/dashboard"  />
        }

        return (
            <>
            <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
            <Grid container justifyContent = "center" align = "center">
                <Grid item xs = {3}>
                    <Paper>
                        <Form onSubmit = {handleSubmit(onSubmit)}>
                            <TextField  error = {errors.email? true : false} label ="Email" {... register("email")} />
                                <Error>{errors.email?.message}</Error>
                            <TextField error = {errors.password? true : false} label = "Senha" {... register("password")} type = {password? "password" : "text"} 
                            InputProps = {{ 
                                endAdornment: password? 
                                <VisibilityOffIcon onClick = {handlePassword}/>
                                : 
                                <VisibilityIcon onClick = {handlePassword}/> }}
                                />
                                <Error>{errors.password?.message}</Error>
                            <TextField error = {errors.confirmPassword? true : false} type ="password" label = "Confirmar Senha" {... register("confirmPassword")}/>
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
        </>
        )
    }

    export default Register