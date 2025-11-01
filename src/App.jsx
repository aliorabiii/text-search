import { useState } from 'react'

import {articles} from './data';

import './App.css'

function App() {
  const [query, setQuery] = useState("");

 const filtered =articles.filter(
   (a) =>
    

    a.title.toLowerCase().includes(query.toLowerCase())
     ||
    a.content.toLowerCase().includes(query.toLowerCase()) 
  
  );

  const countM=()=>{
    if(!query.trim()) return 0;

    let count=0;
     const regex=new RegExp(`(${query})`,"gi");
     filtered.forEach((article)=>{

      const titleM=article.title.match(regex);
      const contentM=article.content.match(regex);
      if(titleM) count+=titleM.length;
      if(contentM) count+=contentM.length;
     });
     return count;
  }
  const highlight =(text)=>{

    if(!query) return text;
    const regex=new RegExp(`(${query})`,"gi");
    return text.replace(regex,"<mark> $1 </mark>");
  };

  return (


    <div className='container'>
      <h2>Search</h2>

      <input type="text" 
      placeholder='search for something ... '
       value={query}
      
      onChange={(e) => setQuery(e.target.value)}
      />
      

      <p>{countM()} posts found. </p>

      <div className='results'> 
        {filtered.map((article,i) => (
          <div key={i} className='article'>
            <h3 dangerouslySetInnerHTML={{__html:highlight(article.title)}}
            ></h3>
            <p className='date'> {article.date}</p>
            <p dangerouslySetInnerHTML={{__html:highlight(article.content)}}
            ></p>

          </div>



        ))}

      </div>



    </div>
  );



}

export default App
