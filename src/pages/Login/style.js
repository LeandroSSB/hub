import styled from "styled-components";

export const Form = styled.form`
display: flex;
flex-flow: column wrap;
`
export const Error = styled.p`
font-size: 15px;
color: red;
`
export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to left, #7AA5BF, #224459);
  >div{
    padding: 3rem;
    background: #5881A6;
    text-align: center;
    >form{
      >span{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 15px;
        >p{
          margin: 0
        }
        p + a{
          margin: 10px;
        }
      }
    }
    @media( max-width: 750px ){
      width: 100%;
      text-align: start;
    }
    @media(max-width: 450px){
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column;
      text-align: start;
      justify-content: center;
    }
  }
`