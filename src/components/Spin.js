// import React, { Component } from 'react'
import loading from './loading.gif'
// export class Spin extends Component { //this is class base
  const Spin=()=>{   //this is function base

  
  // render() {
    return (
      <div className='text-center'>
        <img  className="my-3" src={loading} alt="loading" />
      </div>
    )
  }
// }

export default Spin
