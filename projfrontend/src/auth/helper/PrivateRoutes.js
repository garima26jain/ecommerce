import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';


//children means rendering multiple components 
// but here we are rendering just 1 component
const PrivateRoute = ({component:Component, ...rest})=>{
    return(
        <Route
        {...rest}
        render={props  =>
        isAuthenticated() ?(
            <Component {...props}/>
         ):(
            <Redirect
                to={{
                    pathname:"/signin",
                    state:{from:props.location}
                }}
            /> 
         )
        }
        />
    )
}


export default PrivateRoute;