import React, { Component } from 'react';
import axios from 'axios';



class Login extends Component {

    constructor(props) {
        super(props);
        this.state={
          data:{
            email:'',
            password:''
          },
          error:null
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
      }
      
      submitHandler(e){
        e.preventDefault();
        axios.post("http://localhost:8000/api/admin/login", this.state.data).then((res)=>{
         console.log(res);
         if (res.data.err) {
          return  this.setState({err:res.data.message})
         } 
          return this.props.history.push("/Admin-panel/DashboardArticle");
        });
      }
    
    
      
      changeHandler(e){
        var formData = this.state.data;
        formData[e.target.name] = e.target.value;
        this.setState({
            data : formData
        })
    
      }
    
      
      render() {
          var changeHandler= this.changeHandler;
        return (
          <div className='loginform'>
            <h1>Login</h1>
            {this.state.err && <h3>{this.state.err}</h3> }
          <form onSubmit={this.submitHandler}>
                <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" value={this.state.data.email} name="email" onChange={changeHandler} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={changeHandler} value={this.state.data.password} name="password" type="password" className="form-control" id="password" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
    </form>
          </div>
        )
      }
    }
    
    export default Login;




