import { Paper, TextField, Button, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import { Form, Error, Container } from "./style";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/Auth";

const Login = () => {
  const [password, setPassword] = useState(true);
  const handlePassword = () => setPassword(!password);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Precisa ser um email")
      .required("Campo Obrigatorio"),
    password: yup
      .string()
      .min(6, "minimo 6 caracteres")
      .required("Campo obrigatorio"),
  });
  const { auth, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = ({ email, password }) => {
    const user = {
      email,
      password,
    };
    axios
      .post("https://kenziehub.me/sessions", { ...user })
      .then((res) => {
        const { token } = res.data;
        const { id } = res.data.user;
        console.log(login);
        login(id, token);
      })
      .catch((err) => toast.error("Email ou senha incorreta"));
  };

  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Paper>
        <h1> KenzieHub. </h1>
        <h2>Bem vindo de volta!</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={errors.email ? true : false}
            label="Email"
            {...register("email")}
          />
          <Error>{errors.email?.message}</Error>
          <TextField
            error={errors.password ? true : false}
            label="Senha"
            {...register("password")}
            type={password ? "password" : "text"}
            InputProps={{
              endAdornment: password ? (
                <IconButton>
                  <VisibilityOffIcon onClick={handlePassword} />
                </IconButton>
              ) : (
                <IconButton>
                  <VisibilityIcon onClick={handlePassword} />
                </IconButton>
              ),
            }}
          />
          <Error>{errors.password?.message}</Error>
          <Button type="submit" variant="outlined">
            {" "}
            Login{" "}
          </Button>
          <span>
            <p>Nao tem conta?</p>
            <Link to="/register">Inscreva-se!</Link>
          </span>
        </Form>
      </Paper>
    </Container>
  );
};

export default Login;
