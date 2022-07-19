import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import axios, { AxiosResponse } from "axios";
import './Chat.scss';

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
    socket.emit("conectado", { usuario });
  }, [usuario]);

  socket.on("messageEvent", (info) => {
    setMensajes([...mensajes, info]);
  });

  const getMessages = async () => {
    axios.get("http://192.168.1.190:8080/user/").then((res) => {
      setData(res.data);
    });
  };

  React.useEffect(() => {
    getMessages();
  }, []);

  const submit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const id = data.length + 1;
    const fecha = new Date().toLocaleString();
    await axios({
      method: "POST",
      url: "http://192.168.1.190:8080/user/create",
      data: {
        id: id,
        usuario: usuario,
        mensaje: mensaje,
        fecha: fecha,
      },
    });
    socket.emit("messageEvent", { usuario, mensaje, id, fecha });
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat">
          {data.map((item: ModelP, index) => {
            return (
              <div key={index}>
                <p>
                  {item.usuario} : {item.mensaje}
                </p>
              </div>
            );
          })}
          {mensajes.map((e: any, i: any) => (
            <div key={i}>
              <p>
                {e.usuario} : {e.mensaje}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={submit}>
          <button><img src="https://popnaija.net/wp-content/uploads/2020/05/icon-send.png" alt="" /></button>
          <textarea
            name=""
            id=""
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          ></textarea>
        </form>
      </div>
    </>
  );
};
