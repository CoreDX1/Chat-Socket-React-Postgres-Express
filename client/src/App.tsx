import { useState , useEffect } from "react"
function App() {

      const [data, setData] = useState([])

      useEffect(() => {
        fetch('http://127.0.0.1:8080/user/')
        .then(res => res.json())
        .then(setData)
      },[])

  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App
