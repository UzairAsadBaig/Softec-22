import React, { useContext } from 'react'
import AppContext from '../context/appState/AppContext'

export default function Alert() {

  const { alert }=useContext( AppContext );

  if ( alert ) {
    return (
      <div className={`alert alert_box alert-${alert.type} alert-dismissible w-25 mx-auto fade show`} role="alert">
        <strong>{alert.type==='danger'? "error":alert.type}: </strong> {alert.msg}
      </div>
    )
  }
  else {
    return <></>
  }


}
