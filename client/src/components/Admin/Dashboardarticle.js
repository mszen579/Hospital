import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';


class Dashboardarticle extends Component {
  constructor(props){
    super(props);

    this.state = {

      students: null,
      loading: true,
      studentClass: null,

    }
    
  }
  handleAddscore() {
    window.location.href = '/admin/addscore';
  }
  handleEdit()
  {
    window.location.href='/admin/editdetails';
  }


  componentDidMount() {
    let _this = this;
    axios.get("http://localhost:8000/api/listofstudents")
      .then((response) => {

        console.log(response);
        if (response.data.error) {
          _this.setState({ loading: false })
        } else {
          _this.setState({ students: response.data, loading: false ,})
        }
      })
      .catch((error) => {
        console.log(error)
      })


  }

  render() {
    let _this = this;
    console.log(this.state.students);
    return (
      <div>
        <AdminNav />
        <h1>Admin Dashboard</h1>

        <div className="table-responsive-md">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" colSpan={1}>#</th>
                <th scope="col" colSpan={1}>Picture</th>
                <th scope="col" colSpan={3}>Name</th>
                <th scope="col" colSpan={4}>Actions</th>

              </tr>
            </thead>
            <tbody>

              {this.state.students && this.state.students.map(function (student) {
                console.log(student);
                return (
                  <tr key={student._id}>
                    <td>
                      {student.profilePic &&
                        <img src={`http://localhost:8000/uploads/${student.profilePic}`} width="100" height="120" />}
                    </td>
                    <td colSpan={3}>{student.FirstName} {student.LastName}</td>

                    <td><Link className="btn btn-primary" to={`/admin/${student.StudentID}/editdetails`}>Edit</Link></td>
                    <td><Link className="btn btn-primary" to={`/student/profile/${student.StudentID}`}>View Profile</Link></td>
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