import React, { useState } from "react";
import {Container} from "react-bootstrap"


export default function Api() {
    const [data, setData] = useState([]);
    const [inputs, setInputes]=useState({})
    //Get Method
    const apiGet = () => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setData(json);
        });
    };
     //post Method
     const apiPost = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: inputs.title,
    body: inputs.body,
    userId: parseInt(inputs.userId),
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
      };
  const handleChange=(e)=>{
      e.persist()
      setInputes((inputs)=>({
        ...inputs,
        [e.target.name]:e.target.value,

      }))
  }
  const handleSubmit=(e)=>{
      e.preventDefault();
      apiPost();
      console.log(inputs);
  }
    return (
      <Container>
       <h1 className="title-api">API from  https://jsonplaceholder.typicode.com/</h1>  <br />
        <button className="btn-api" onClick={apiGet}>Fetch API</button>
        <br />
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <div>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                {item.userId},{item.title}
              </li>
            ))}
          </ul>
          <div>
              <form onSubmit={handleSubmit}>
                  <input type="text" name="title" placeholder="title" onChange={handleChange}></input><br/>
                  <input type="text" name="body" placeholder="body" onChange={handleChange}></input><br/>
                  <input type="number" name="userId" placeholder="userId" onChange={handleChange}></input><br/>
                  <input type="submit" value="Submit(Post)" onChange={handleChange}></input>

              </form>
          </div>
        </div>
      </Container>
    );
  }
  
