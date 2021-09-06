import { Redirect } from "react-router-dom";
import { Paper, Button, TextField, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Container, Item, List } from "./styles";
import api from "../../services/api";
import { useAuth } from "../../providers/Auth";

const Dashboard = () => {
  const [att, setAtt] = useState(false);
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");

  const skillLevel = ["Iniciante", "Intermediário", "Avançado"];
  const { auth } = useAuth();
  const token = JSON.parse(localStorage.getItem("@KenzieHub:token"));
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const handleSubmit = (name, skill) => {
    const user = {
      title: name,
      status: skill,
    };
    api
      .post("/users/techs", user, config)
      .then((_) => setAtt(!att))
      .then((_) => toast.success("adicionado!"))
      .catch((err) => toast.error(`Tecnologia repetida!`));
  };

  const handleDelete = (json) => {
    const id = json;

    api
      .delete(`/users/techs/${id}`, config)
      .then((_) => toast.success(" Deletado com sucesso! ", {}))
      .then((_) => setAtt(!att))
      .catch((err) => alert(err));
  };

  const [techs, setTechs] = useState([]);
  const id = JSON.parse(localStorage.getItem("@KenzieHub:id"));

  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((res) => res.data.techs)
      .then((res) => setTechs(res));
  }, [att]);

  if (!auth) {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <Paper>
        <h2> Criar tecnologias </h2>
        <TextField
          label="Tecnologia"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Nivel tecnico "
          style={{ width: "100%" }}
          select
          onChange={(e) => setSkill(e.target.value)}
        >
          {skillLevel.map((a, b) => (
            <MenuItem value={a} key={b}>
              {a}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="outlined" onClick={() => handleSubmit(name, skill)}>
          Adicionar
        </Button>
      </Paper>

      <List>
        {techs.map((a, b) => (
          <Item key={b}>
            <h4>{a.title}</h4>
            <h5>Nivel tecnico: {a.status}</h5>
            <Button variant="outlined" onClick={() => handleDelete(a.id)}>
              Apagar
            </Button>
          </Item>
        ))}
      </List>
    </Container>
  );
};
export default Dashboard;
