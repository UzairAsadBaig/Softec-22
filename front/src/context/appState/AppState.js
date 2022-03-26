import React, { useState } from 'react';
import AppContext from './AppContext';



const AppState=( props ) => {


  const [ alert, setAlert ]=useState( null );

  const showAlert=( msg, type ) => {

    setAlert( {
      msg,
      type
    } )
    setTimeout( () => setAlert( null ), 3000 )

  }

  const onChangeGeneric=( stateVar, stateModifier ) => {

    return (
      ( event ) => {
        // console.log( stateVar )
        stateModifier( { ...stateVar, [ event.target.name ]: event.target.value } )
      }
    )

  }


  return (

    <AppContext.Provider value={{ onChangeGeneric, showAlert, alert, setAlert }}>
      {props.children}
    </AppContext.Provider>

  )
}

export default AppState