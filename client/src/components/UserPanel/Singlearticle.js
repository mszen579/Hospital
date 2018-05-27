//Singlearticle.js
import React from 'react';
import axios from 'axios';

class Singlearticle extends React.Component{
  constructor(props){
    super(props);

    if(props.location.state !== undefined){
            this.state = {
                ArticleInfo: this.props.location.state.detail
            }
        }
        else{
            this.state ={
                ArticleInfo: 'No Article'
            }
        }
      this.handleBadgesClick = this.handleBadgesClick.bind(this);
  }

  componentDidMount(){
    let _this = this;
    console.log(this.props.match.params.id);
    axios.post('http://localhost:8000/Article/profileinfo/' + this.props.match.params.id)
    .then(function(response){
        _this.setState({
            ArticleInfo: response.data
        })
    })
    .catch(function(error){
        console.log(error);
    })
  }

  handleBadgesClick(){
    this.props.history.push({
      pathname: '/Admin-panel/DashboardArticle',
      state: { detail: this.state.ArticleInfo }
    });
  }

  render(){
        // if(this.state.ArticleInfo === 'No Article')
        // {return <p>Please enter a valid ArticleID</p>
        // }
        if(this.state.ArticleInfo !== 'No Article'){
        var DOBdate = new Date(this.state.ArticleInfo.DateOfBirth);
        // var DOBdateFormat = DOBdate.toISOString().substring(0, 10);
      }
    return(
        <div>
       
            <a className="btn btn-danger btn-lg ArticleProfile-button" onClick={this.handleBadgesClick}>Back to Dashboard</a>
        <div className="container ArticleProfile-container">
            <h2> Article Profile </h2>
                    <div className="ArticleProfile-MainContainer">
                        <div className="ArticleProfile-leftContainer">
                          <img src={`http://localhost:8000/uploads/${this.state.ArticleInfo.profilePic}`}
                          className="img-rounded img-responsive" alt="Profile Picture" />
                        </div>

                        <div className="ArticleProfile-rightContainer">
                            <h3> {this.state.ArticleInfo.title} </h3>
                            <ul className="ArticleProfile-leftList">
                            <table>
                            <thead></thead>
                            <tbody>
                              
                               <tr>
                                  <td className="ArticleProfile-firstCol"><li> Title: </li> </td>
                                  <td className="ArticleProfile-secCol"> <li> {this.state.ArticleInfo.title} </li></td>
                               </tr>
                               <tr>
                                  <td className="ArticleProfile-firstCol"><li> Description: </li> </td>
                                  <td className="ArticleProfile-secCol"> <li> {this.state.ArticleInfo.ShortDescription} </li></td>
                               </tr>
                               <tr>
                                  <td className="ArticleProfile-firstCol"><li> Location: </li> </td>
                                  <td className="ArticleProfile-secCol"> <li> {this.state.ArticleInfo.location} </li></td>
                               </tr>
                               <tr>
                                  <td className="ArticleProfile-firstCol"><li> Photos: </li> </td>
                                  <td className="ArticleProfile-secCol">  <li> <a href= {this.state.ArticleInfo.profilePic}
                                    className="ArticleProfile-link-style"> {this.state.ArticleInfo.Video} </a> </li></td>
                               </tr>
                               </tbody>
                            </table>
                            </ul>
                            <p> {this.state.ArticleInfo.ShortDescription}</p>
                        </div>
                    </div>
  
        </div>

        </div>
    )
  }
}


export default Singlearticle;
