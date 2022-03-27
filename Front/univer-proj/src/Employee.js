import React, { Component } from 'react'
import { variables } from './Variables'

export class Employee extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employeers: [],

      EmployeeNameFilter: '',
      employeersWithoutFilter: [],
    }
  }

  filterFn() {
    var EmployeeNameFilter = this.state.EmployeeNameFilter

    var filteredData = this.state.employeersWithoutFilter.filter(function (el) {
      return el.EmployeeName.toLowerCase().includes(
        EmployeeNameFilter.trim().toLowerCase()
      )
    })

    this.setState({ employeers: filteredData })
  }

  changeEmployeeNameFilter = (e) => {
    this.state.EmployeeNameFilter = e.target.value
    this.filterFn()
  }

  refreshList() {
    fetch(variables.API_URL + 'employee')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employeers: data, employeersWithoutFilter: data })
      })
  }

  componentDidMount() {
    this.refreshList()
  }

  render() {
    const { employeers } = this.state

    return (
      <div>
        <input
          className="form-control m-2"
          onChange={this.changeEmployeeNameFilter}
          placeholder="Filter by name"
        ></input>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Employee Name</th>
            </tr>
          </thead>
          <tbody>
            {employeers.map((emp) => (
              <tr key={emp.EmployeeId}>
                <td>{emp.EmployeeId}</td>
                <td>{emp.EmployeeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
