//Singlearticle.js
import React from 'react';
import axios from 'axios';

class Singlearticle extends React.Component{
  constructor(props){
    super(props);

    if(props.location.state !== undefined){
            this.state = {
                studentInfo: this.props.location.state.detail
            }
        }
        else{
            this.state ={
                studentInfo: 'No student'
            }
        }
      this.handleBadgesClick = this.handleBadgesClick.bind(this);
  }

  componentDidMount(){
    let _this = this;
    console.log(this.props.match.params.id);
    axios.post('http://localhost:8000/student/profileinfo/' + this.props.match.params.id)
    .then(function(response){
        _this.setState({
            studentInfo: response.data
        })
    })
    .catch(function(error){
        console.log(error);
    })
  }

  handleBadgesClick(){
    this.props.history.push({
      pathname: '/student/badges',
      state: { detail: this.state.studentInfo }
    });
  }

  render(){
        // if(this.state.studentInfo === 'No student')
        // {return <p>Please enter a valid StudentID</p>
        // }
        if(this.state.studentInfo !== 'No student'){
        var DOBdate = new Date(this.state.studentInfo.DateOfBirth);
        var DOBdateFormat = DOBdate.toISOString().substring(0, 10);
      }
    return(
        <div>
       
            <a className="btn btn-danger btn-lg StudentProfile-button" onClick={this.handleBadgesClick}>Badges Earned</a>
        <div className="container StudentProfile-container">
            <h2> Student Profile </h2>
                    <div className="StudentProfile-MainContainer">
                        <div className="StudentProfile-leftContainer">
                          <img src={`http://localhost:8000/uploads/${this.state.studentInfo.profilePic}`}
                          className="img-rounded img-responsive" alt="Profile Picture" />
                        </div>

                        <div className="StudentProfile-rightContainer">
                            <h3> {this.state.studentInfo.FirstName} {this.state.studentInfo.LastName} </h3>
                            <ul className="StudentProfile-leftList">
                            <table>
                            <thead></thead>
                            <tbody>
                              <tr>
                                <td className="StudentProfile-firstCol">  <li> Date of Birth : </li></td>
                                <td className="StudentProfile-secCol"> <li> {DOBdateFormat} </li> </td>
                               </tr>

                               <tr>
                                  <td className="StudentProfile-firstCol"><li> Email: </li> </td>
                                  <td className="StudentProfile-secCol"> <li> {this.state.studentInfo.Email} </li></td>
                               </tr>
                               <tr>
                                  <td className="StudentProfile-firstCol"><li> Status: </li> </td>
                                  <td className="StudentProfile-secCol"> <li> {this.state.studentInfo.Status} </li></td>
                               </tr>
                               <tr>
                                  <td className="StudentProfile-firstCol"><li> Story of You: </li> </td>
                                  <td className="StudentProfile-secCol">  <li> <a href= {this.state.studentInfo.Video}
                                    className="StudentProfile-link-style"> {this.state.studentInfo.Video} </a> </li></td>
                               </tr>
                               </tbody>
                            </table>
                            </ul>
                            <p> {this.state.studentInfo.ShortDescription}</p>
                        </div>
                    </div>
  
        </div>

        </div>
    )
  }
}


export default Singlearticle;
