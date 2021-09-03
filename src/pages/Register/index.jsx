import { Paper, TextField, Button, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import { Form, Error, Container } from "./style";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

const Register = ({ auth }) => {
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas precisam coincidir")
      .required("Campo obrigatorio"),
    name: yup.string().required("Campo obrigatorio"),
    bio: yup.string().required("Campo obrigatorio"),
    contact: yup.string().required("Campo obrigatorio"),
    course_module: yup.string().required("Campo obrigatorio"),
  });
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = ({ email, password, name, bio, contact, course_module }) => {
    const tratedObj = {
      email,
      password,
      name,
      bio,
      contact,
      course_module,
    };
    console.log(tratedObj);
    api
      .post("/users", { ...tratedObj })
      .then((_) => {
        toast.success("Conta criada!");
        return history.push("/login");
      })
      .catch((err) => toast.error(`${err}`));
  };

  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Paper>
        <h1>KenzieHub</h1>
        <h3>Registro</h3>
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
          <TextField
            error={errors.confirmPassword ? true : false}
            type="password"
            label="Confirmar Senha"
            {...register("confirmPassword")}
          />
          <Error>{errors.confirmPassword?.message}</Error>
          <TextField
            error={errors.name ? true : false}
            label="Nome"
            {...register("name")}
          />
          <Error>{errors.name?.message}</Error>
          <TextField
            error={errors.bio ? true : false}
            label="Bio"
            {...register("bio")}
          />
          <Error>{errors.bio?.message}</Error>
          <TextField
            error={errors.contact ? true : false}
            label="Contato"
            {...register("contact")}
          />
          <Error>{errors.contact?.message}</Error>
          <TextField
            error={errors.course_module ? true : false}
            label="Modulo do curso"
            {...register("course_module")}
          />
          <Error>{errors.course_module?.message}</Error>
          <Button type="submit" variant="outlined">
            Cadastrar
          </Button>
          <span>
            <p>Ja tem uma conta?</p>
            <Link to="/login"> Login </Link>
          </span>
        </Form>
      </Paper>
    </Container>
  );
};

export default Register;
