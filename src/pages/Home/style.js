    import styled from "styled-components";
    import { makeStyles } from "@material-ui/core";

    export const useStyles = makeStyles((theme) => ({
      paper: {
        padding: "5rem",
        textAlign: "center",
        background: "#5881A6",
        color: "black",
      }
    }))

    export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to left, #7AA5BF, #224459);
    >div{
      >button + button{
        margin: 10px;
      }
    }
    @media(max-width: 600px){
      >div{
        padding: 20px;
        width: 30vh;
          >button + button{
          margin: 10px;
        }
      }
    }
    `
