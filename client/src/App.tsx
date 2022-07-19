import React, { useState, useEffect, SetStateAction } from "react";
import { Chat } from "./components/Chat/Chat";
import "./App.scss";

function App() {
  const [usuario, setNombre] = useState<string>("");
  const [registrado, setRegistrado] = useState<boolean>(false);

  const registrar = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (usuario !== "") {
      setRegistrado(true);
    }
  };

  return (
    <>
      <div className="container">
        <div className="formContainer">
          {!registrado && (
            <form onSubmit={registrar}>
              <label htmlFor="">¿conversamos? - En línea</label>
              <p className="text-info">
                rellene el siguiente formulario para empezar a chatear con el
                siguiente agente disponible.
              </p>
              <div className="name">
                <input
                  value={usuario}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingrese su nombre"
                />
                <button>Ir al chat</button>
              </div>
            </form>
          )}
        </div>

        {registrado && <Chat usuario={usuario} />}
      </div>
    </>
  );
}

export default App;
