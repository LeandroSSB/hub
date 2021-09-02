    import styled from "styled-components";
    import { makeStyles } from "@material-ui/core";

    export const useStyles = makeStyles((theme) => ({
      paper: {
        padding: "5rem",
        textAlign: "center",
        background: "gray",
        color: "white",
      }
    }))

    export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: hsl(230, 7%, 25%);
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
