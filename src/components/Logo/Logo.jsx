import React from 'react';
import Tilt from 'react-tilt'
import brain from './logo.png';
function Logo() {
  return (
    <div className ='ma4 '>
        <Tilt className="Tilt shadow-5 br2" options={{ max : 55 }} style={{ height: 120, width: 120 }} >
            <div className="Tilt-inner"> <img  src ={brain} alt="logo" /> </div>
        </Tilt>
   </div>
  );
}

export default Logo;
