import { Paper } from '@material-ui/core'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  background: linear-gradient(to left, #7AA5BF, #224459);
  div + div {
    margin: 10px;
  }
  >div{
    background: #5881A6;
    padding: 50px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    >button{
      width: 50%;
    }
    button + button {
      margin: 10px;
    }
  }
`
export const Item = styled(Paper)`
  display: flex;
  flex-flow: column;
  background: #5881A6;
  align-items: center;
  padding: 50rem;
  padding: 10px;
  margin: 10px;
`
export const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 0;
`
