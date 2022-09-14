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
  const publishName = async(index) =>{
    console.log('Publishing...');
    let cidListLength = name[index].cid_list.length;

    if(cidListLength > 0){

      // Create Revision or version 0
      /* Using Name.v0 to create initial revision
      const revision = await Name.v0(name, value);*/
      let revisionToBeInserted = await Name.v0(name[index].name, `/ipfs/${name[index].cid_list[cidListLength - 1]}`);
      //console.log(revisionToBeInserted);
      // Publish the revision
      let publishedRevision = await Name.publish(revisionToBeInserted,name[index].name.key);
      console.log(revisionToBeInserted);  
      

      console.log(`https://gateway.ipfs.io/ipns/${name[index].name}`);
    }
    else{
      alert('CID Doesnt exist');
    }
    
  }

  // Republish name
   const republishName = async(index) =>{
    console.log('Republishing.....'+name[index].name)// This is done

    // Getting the latest name
    let nameParse = Name.parse(name[index].name.toString());
    let latestRevision = await Name.resolve(nameParse);
    console.log('Latest value:', latestRevision);// Done

    let cidListLength = name[index].cid_list.length;

    if(cidListLength > 1){

      // Create Revision or version 0
      /* Using Name.v0 to create initial revision
      const revision = await Name.v0(name, value);*/
      let revisionToBeInserted = await Name.increment(latestRevision, `/ipfs/${name[index].cid_list[cidListLength - 1]}`);
      console.log("Length:"+cidListLength);// Done
      console.log("latest CID:",name[index].cid_list[cidListLength - 1]);// Done
      console.log("Latest revision:",revisionToBeInserted);// Done
      console.log("name key:",name[index].name.key);// Done
      // Publish the revision
      //let publishedRevision = 
      let newRevision = await Name.publish(revisionToBeInserted,name[index].name.key);
      console.log("New published revision",newRevision);
      

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
              {/* Submit form for CID_HASH */}
              <form className='form' onSubmit={(event) => formSubmitted({event,index})}>
                  <label>
                    CID_Hash:
                      <input type="text" name="cid" className='w-100' />
                  </label>
                    <input type="submit" className='btn btn-light border border-dark' value="Submit" /> 
              </form>
              
              {value.cid_list.length > 1? <button className='btn bg-dark text-white' onClick={() => republishName(index)}>Re-Publish</button>: <button className='btn bg-dark text-white' onClick={() => publishName(index)}>Publish</button> }
              
            </div>

          );
           
          
        })}
      </div>

      {/* Publish the name along with  */}
     
    </div>
  );
}

export default App;
