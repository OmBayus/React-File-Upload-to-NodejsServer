import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [name,setName] = useState()
  const [file,setFile] = useState()
  const [info,setInfo] = useState({name:"sa"})

  const uploadFile = async e =>{
    e.preventDefault()
    const data = new FormData()
    data.append("name",name)
    data.append("file",file)

    try {
      const res = await axios.post("http://localhost:4000/api/upload",data)

      setInfo({
        fileName:res.data.fileName,
        filePath:res.data.filePath,
        name:res.data.name
      })
    } catch (err) {
      if(err.response.status===500){
        setInfo({...info,name:"There was a problem with the server"})
      }
      else{
        setInfo({...info,name:err.response.data.msg})
      }
    }
  }
  return(
    <div>
      <form onSubmit={uploadFile}>
        <div>
          <input type="text" onChange={e => setName(e.target.value)}/>
        </div>
        <div>
          <input type="file" onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <button type="submit">Upload</button>
      </form>
      {info.filePath ? <div>
        <h3>{info.name}</h3>
        <img src={info.filePath} alt={info.fileName} style={{width:"500px",height:"500px",borderRadius:"50%"}}></img>
      </div>
      :<h3>{info.name}</h3>}
    </div>
  )
  
}

export default App;