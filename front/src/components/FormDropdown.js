// import '../css/FormDropdown.css';
import React, { Component,useEffect,useState } from 'react';




export const FormDropdown = (props) => {
  
  // const [name,setName]= useState(props.name);
  // console.log( name )
  const handleSelection=(e)=>{
    // setName( e.target.getAttribute( 'value' ) );
    // console.log( e.target )
    // console.log( props.formVal )
    // console.log( e.target.getAttribute( 'name' ), e.target.getAttribute( 'value' ) )

    if ( props.formVal ) {
      const obj={ ...props.formVal }
      obj[ e.target.getAttribute( 'name' ) ]=e.target.getAttribute( 'value' );
      props.setFormVal( obj );

    }

    if ( props.formRef ) {
      // const pTy
      // if ( props.setFormVal ) {

      // props.setFormVal( { ...props.formVal,plotType:, block: '', plotArea: '', plotNo: '', plotPrice: '', lat: '', lng: '' } )

      // }

      props.formRef.current.reset();

    }

  };
  
  return(
    <div className="btn-group " style={{width:props.width, opacity:'1',marginBottom:'2rem',zIndex:'5'}}>
      <button value={props.name} className={'btn btn_name '+ (props.noDropdown ? `` : 'dropdown-toggle')} disabled={props.disabled} type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: props.backgroundColor, color: props.color , opacity:'1'}} >
        {props.defaultValue? props.defaultValue:props.name}
  </button>
  <ul className="dropdown-menu list"  style={{width:'100%'}} onClick={handleSelection}>

  {
          props.list.map( ( e,i ) => <li key={i} className='list_item' name={props.name} value={e}>{e}</li> )
  }
    
  </ul>
</div>

  )
}
