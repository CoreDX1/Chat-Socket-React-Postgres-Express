import React, { useState, useEffect, SetStateAction } from "react";
import styled from 'styled-components'
import {Chat} from "./components/Chat/Chat";


function App() {
  const [usuario, setNombre] = useState<string>("");
  const [registrado, setRegistrado] = useState<boolean>(false);
 
  const registrar = (event: React.FormEvent<HTMLElement> ) => {
    event.preventDefault();
    if(usuario !== ""){
      setRegistrado(true);
    }
  }

  return (
    <>
    <Div>
    {!registrado && (
        <form onSubmit={registrar}>
          <label htmlFor="">Introduzca su nombre</label>
          <input value={usuario} onChange={(e) => setNombre(e.target.value)} />
          <button>Ir al chat</button>
        </form>
      )}

      {registrado && <Chat usuario={usuario}/>} 
    </Div>
    </>
  )
}

export default App;

const Div =  styled.div`
  color: red;
`