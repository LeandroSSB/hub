import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  background: hsl(230, 7%, 25%);
  div + div {
    margin: 10px;
  }
  >div{
    background: gray;
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
export const Item = styled.li`
  display: flex;
  flex-flow: column;
  background: gray;
  align-items: center;
  padding: 50rem;
  border-radius: .75rem;
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
