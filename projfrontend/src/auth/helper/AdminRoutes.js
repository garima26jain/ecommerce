import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';


//children means rendering multiple components 
// but here we are rendering just 1 component
const AdminRoute = ({component:Component, ...rest})=>{
    return(
        <Route
        {...rest}
        render={props  =>
        isAuthenticated() && isAuthenticated().user.role===1 ?(
            //which component to render will be decided in route
            <Component {...props}/>
         ):(
             //or redirect to
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


export default AdminRoute;