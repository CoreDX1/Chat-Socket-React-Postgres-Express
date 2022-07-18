import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import axios, { AxiosResponse } from "axios";

interface Prop {
  usuario: string;
}
interface Model {
  usuario: string;
  mensaje: string;
}
interface ModelP {
  id: number;
  usuario: string;
  mensaje: string;
  fecha: string;
}

export const Chat = ({ usuario }: Prop) => {
  const [data, setData] = useState<ModelP[]>([]);
  const [mensaje, setMensaje] = useState<string>("");
  const [mensajes, setMensajes] = useState<Model[]>([]);

useEffect(() => {
    const fetchData = async () => {
      const result: AxiosResponse<ModelP[]> = await axios.get(
        "http://127.0.0.1:8080/user/"
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.emit("conectado", { usuario });
  }, [usuario]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...data, mensaje]);
    });
    return () => {
      socket.off();
    };
  }, [data]);
  console.log('Esto es mensaje' + mensaje);

  const submit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const id = data.length + 1;
    const fecha = new Date().toLocaleString();
    socket.emit("mensaje", { usuario, mensaje, id , fecha });
    const response = axios({
      method: "POST",
      url: "http://localhost:8080/user/create",
      data : {
        id : id,
        usuario : usuario,
        mensaje : mensaje,
        fecha : fecha,
      }
    })
    const array = await response;
    console.log(array.data);
  };

  

  console.log(mensajes);

  return (
    <>
      <div>
        <div className="chat">
          {mensajes.map((e, i) => (
            <div key={i}>
              <p>
                {e.usuario} : {e.mensaje}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={submit}>
          <label htmlFor="">Escriba su mensaje</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          ></textarea>
          <button>Enviar</button>
        </form>
      </div>
    </>
  );
};
