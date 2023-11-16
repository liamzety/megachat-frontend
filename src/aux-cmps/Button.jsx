import React from 'react';


export const Button = ({children, onClick}) => {


 return (
  <button onClick={onClick} role='button' className='button'>
    {children}
  </button>
 )
}