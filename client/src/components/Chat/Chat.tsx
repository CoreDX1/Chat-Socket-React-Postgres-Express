import React, { useState, useEffect, SetStateAction } from "react";
import styled from 'styled-components'
import axios, { AxiosResponse } from 'axios';

interface Model{
  id: number;
  usuario : string;
  mensaje : string;
  fecha : string;
}

function App() {
  const [data, setData] = useState<Model[]>([]);

  useEffect(() => {
    const fetchData = async ()  => {
      const result: AxiosResponse<Model[]> = await axios.get('http://127.0.0.1:8080/user/');
      setData(result.data);
    }
    fetchData();
  }, []);


  const renderMessage = () => {
    return data.map((item ) => {
      return <div key={item.id}>
        <p>{item.usuario}- {item.fecha}: {item.mensaje}</p>
      </div>;
    });
  }

  return (
    <>
    <Div>
      {renderMessage()}
    </Div>
    </>
  )
}

export default App;

const Div =  styled.div`
  color: red;
`