import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';


class Dashboardarticle extends Component {
  constructor(props){
    super(props);

    this.state = {

      Articles: null,
      loading: true,

    }
  
  }

  handleEdit()
  {
    window.location.href='/admin/editdetails';
  }


  
  handleDelete()
  {
    
  }



  componentDidMount() {
    let _this = this;
    axios.get("http://localhost:8000/api/admin/listofVolunteers")
      .then((response) => {

        console.log(response);
        if (response.data.error) {
          _this.setState({ loading: false })
        } else {
          _this.setState({ Forms: response.data, loading: false ,})
        }
      })
      .catch((error) => {
        console.log(error)
      })


  }

  render() {
    let _this = this;
    console.log(this.state.Forms);
    return (
      <div>
        <AdminNav />
        <h1>Volunteer Dashboard</h1>

        <div className="table-responsive-md">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" colSpan={1}>name</th>
                <th scope="col" colSpan={2}>Received at</th>
                <th scope="col" colSpan={3}>Actions</th>
                <th scope="col" colSpan={4}>More</th>

              </tr>
            </thead>
            <tbody>

              {this.state.Forms && this.state.Forms.map(function (Form) {
                console.log(Form);
                return (
                  <tr key={Form._id}>
                  <td colSpan={1}>{Form.name} {Form.name}</td>
                  <td colSpan={2}>{Form.createdAt} {Form.createdAt}</td>
                    <td><button className="btn btn-danger" onClick={this.handleDelete}>Delete</button></td>
                    <td><Link className="btn btn-primary" to={`/${Form._id}/SingleForm`}>View details</Link></td>
                 </tr>
                )
              }.bind(this))}
        </tbody>
      </table>
    </div>
  </div>
  )

  }
}
export default Dashboardarticle;