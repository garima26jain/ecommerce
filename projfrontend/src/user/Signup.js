import React,{useState} from "react";
import Base from '../core/Base';
import {Link} from "react-router-dom";
import {signup} from '../auth/helper';



const Signup=()=>{
    //defining the states so that form  values are stored 
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    });

    //destructuring 
    const{name,email,password,error,success}=values

    //handleChanges using functional programming
    //handling with just 1 value (advanced JS)
    //here name will take paramater everytime as name,email then pwd then value will be set in the state

    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})

    }

    //onSubmit
    const onSubmit=e=>{
        e.preventDefault();
        setValues({...values,error:false})
        signup({name,email,password})
            .then(data => {
                if(data.error){
                    setValues({...values,error:data.error ,success:false})
                }
                else{
                    setValues({
                        ...values,
                        name:"",
                        email:"",
                        password:"",
                        error:"",
                        success:true
                    })
                }
            }).catch(console.log("Error in Signup"));
    }

    const SignupForm=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label  className="text-light">Name</label> 
                            <input className="form-control" type="text" value={name}
                             onChange={handleChange("name")} name="" id=""/>
                        </div>    

                        
                        <div className="form-group">
                            <label  className="text-light">Email</label> 
                            <input className="form-control" type="email" value={email}
                             onChange={handleChange("email")} name="" id=""/>
                        </div>

                        
                        <div className="form-group">
                            <label  className="text-light">Password</label> 
                            <input className="form-control" type="password" value={password}
                             onChange={handleChange("password")} name="" id=""/>
                        </div>

                        <button onClick={onSubmit} className="button btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage=()=>(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success"
                 style={{display: success? "":"none"}}
                >
                    New account created successfuly.Please<Link to="/signin">Login Here</Link>
                </div>
            </div>
        </div>
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

    return(
        <Base title="Signup Page" description="Apage for user to  signup">
            {successMessage()}
            {errorMessage()}
            {SignupForm()}
            <p className="text-white text-center" >{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup; 