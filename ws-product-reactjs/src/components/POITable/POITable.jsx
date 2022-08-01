import React, {useState}from 'react';
import debounce from "lodash.debounce";
import './POITable.scss';
import {useFetch, Error} from '../../constant';
import Table from '../Table/Table';

import {COLUMNS} from './columns';

function POITable({url}) {
  const[link, setLink] = useState(url);
  const {data: input, loading, error} =  useFetch(link);
  
  const updateLink = e =>{
    const value = e?.target?.value
    let newLink;
    if (value){
      newLink = url+`?search=${value}`
    }else{
      newLink = url;
    }
    
    setLink(newLink)
  }
   const debouncedOnChange = debounce(updateLink, 400);
  if(loading) {<p>Loading</p>}
  if (error) return <Error  message={error.message} status={error.response.status}/>
  return (
    <div className='poi__container'>
      <span className='poi__search'>
        <input  type='text' name='search' placeholder='SEARCH' onChange={debouncedOnChange}/>
        <i className="icon fa fa-search"></i>
      </span>
        
    <Table input={input}  COLUMNS={COLUMNS}/>
    </div>
  )
}

export default POITable