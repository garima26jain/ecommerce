import React,{useState} from "react";
import Base from '../core/Base';
import {Link,Redirect} from "react-router-dom";
import {signin,authenticate,isAuthenticated} from "../auth/helper";

const Signin=()=>{

    const [values,setValues]=useState({
        email:"tayloswift@yahoo.com",
        password:"tayloswift",
        error:"",
        loading:false,
        //if successfully signed up then to redirect based on role
        didRedirect:false
    })

    const {email,password,error,loading,didRedirect}=values
    //isAuthenticated is returning a jwt so store it
    const {user}=isAuthenticated();

    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})

    }

    const onSubmit=e=>{
        e.preventDefault();
        setValues({...values,error:false,loading:true,})
        signin({email,password})
        //if interacted with db
        .then(data=> {
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({
                        ...values,
                        didRedirect:true
                    })
                })
            }
        })
        //if not interacted with db
        .catch(console.log("signin failed /DB not reachable"));
        
    }
    
    //this will tell whether we should redirect or not
    const performRedirect=()=>{
        if(didRedirect){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard"/>
            }
            else{
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }

    const loadingMessage=()=>(
       loading &&(
           //this is just a component so it will always be true 
           // so it depends on loading either true or false
           <div className="alert alert-info">
            <h2>loading...</h2>
           </div>
       )
    )

    const errorMessage=()=>(
        
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-danger"
                style={{display: error? "":"none"}}
                >
                {error}
                </div>
            </div>
        </div>
    )

    const SigninForm=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label  className="text-light">Email</label> 
                            <input className="form-control" value={email}
                             onChange={handleChange("email")} type="email" name="" id=""/>
                        </div>

                        
                        <div className="form-group">
                            <label  className="text-light">Password</label> 
                            <input className="form-control" value={password}
                             onChange={handleChange("password")} type="password" name="" id=""/>
                        </div>

                        <button onClick={onSubmit} className="button btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return(
        <Base title="SignIn Page" description="A page for user to  signinp">
            {loadingMessage()}
            {errorMessage()}
            {SigninForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;