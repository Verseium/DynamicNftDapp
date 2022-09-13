// This file is for creating Dynamic Nfts
// Imports
// React based
import React,{useState} from 'react';
// w3name
import * as Name from 'w3name';

const CreateName = () =>{
    
    // Variables
    const [name,setName] = useState([]);

    // Methods
    // To generate a new name and store it in the state array
    const createName = async () => {
    // Create new name
    let nameToBePushed = await Name.create();
    
    // Store the name in an array
    setName(prevName => [...prevName,nameToBePushed]);
    
  }

    // Render
    return(
        <div>
            <button onClick={createName}>Create New name</button>
            {/* <!-- For rendering the page --> */}
            <div>
                {name.map((value,index)=>{

                return(
                    <div key={index}>{value.toString()}</div>
                );
                
                
                })}
            </div>
        </div>
    )
}

export default CreateName;