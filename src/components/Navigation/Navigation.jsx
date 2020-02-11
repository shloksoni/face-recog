import React from 'react';



function Navigation({onRouteChange, isSignedIn}) {
  if(isSignedIn){
  return (
      <div onClick = {() => {
       
        onRouteChange("signIn")
      }
      }  className = 'pa3 white dim link underline f3 black pointer' style= {{display : "flex", justifyContent: 'flex-end'}}>
          Sign Out
      </div>
  );
  }
  else{
    return(
      <nav  style= {{display : "flex", justifyContent: 'flex-end'}}>
     <span onClick = {() => onRouteChange("signIn")} className = 'pa3 white dim link underline f3 black pointer'>Sign In</span>
      <span onClick = {() => onRouteChange("register")} className = 'pa3 white dim link underline f3 black pointer'> Register</span>
  </nav>
    )
  }
}

export default Navigation;
