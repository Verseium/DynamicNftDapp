// This file is for creating Dynamic Nfts
// Imports
// React based
import React,{useState} from 'react';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
// w3name
import * as Name from 'w3name';

const App = () => {

  // Variables
  const [name,setName]          = useState([]);
  const [cid,setCid]            = useState([]);
  const [revision,setRevision]  = useState([]);


  // Methods

  // To generate a new name and store it in the state array
  const createName = async () => {
    // Create new name
    let nameToBePushed = await Name.create();

    let nameObj = {name:nameToBePushed,cid_list:[],publishedCounter:0}; 
    
    // Store the name in an array
    setName(prevName => [...prevName,nameObj]);

    console.log(name);
    
  }

  // CID hash submission handler and to store the hash in the state array
  const formSubmitted = async ({event,index}) =>{
    event.preventDefault();

    // cid to be inserted to the array
    let cidToBeInserted = event.target.cid.value;

    let arrayToBeEnteredByCidList = name[index].cid_list;

    arrayToBeEnteredByCidList.push(cidToBeInserted);
    console.log(name[index]);
    
  }

  // Publish new name
  const publishName = async({e,index}) =>{

    let cidListLength = name[index].cid_list.length;

    if(cidListLength > 0){

      // Create Revision or version 0
      let revisionToBeInserted = await Name.v0(name[index].name, name[index].cid_list[cidListLength - 1]);

      // Publish the revision
      let publishedRevision = await Name.publish(revisionToBeInserted,name[index].name.key);
      console.log(revisionToBeInserted);
      /*if(publishedRevision){
        name[index].publishedCounter++;
        
      }*/
      // Link to view the data

      console.log(`https://gateway.ipfs.io/ipns/${name[index].name}`);
    }
    else{
      alert('CID Doesnt exist');
    }
    
  }


  return (
    <div className="container-fluid border border-dark">

      <button className='btn btn-dark mt-5' onClick={createName}>Create New name</button><br/>



    {/* <!-- --> */}
      <div className='row bg-secondary mt-5 border border-dark '>
        {name.map((value,index)=>{

          return(
            <div key={index} className="border m-3 p-2 bg-light w-75 border border-dark rounded-3">
              <h1>{index}</h1>
              Name: <span><a href={`https://gateway.ipfs.io/ipns/${value.name}`} target="_blank">{value.name.toString()}</a></span>
              <form className='form' onSubmit={(event) => formSubmitted({event,index})}>
                  <label>
                    CID_Hash:
                      <input type="text" name="cid" className='w-100' />
                  </label>
                    <input type="submit" className='btn btn-light border border-dark' value="Submit" /> 
              </form>
              
              
              <button className='btn bg-dark text-white' onClick={(e) => publishName({e,index})}>Publish</button>
            </div>

          );
           
          
        })}
      </div>

      {/* Publish the name along with  */}
     
    </div>
  );
}

export default App;
