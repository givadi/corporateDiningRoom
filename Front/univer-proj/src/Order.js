import React, { Component } from 'react'
import { variables } from './Variables'

export class Order extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orders: [],
      OrderId: 0,
      BuyerId: 0,
      BuyerName: '',
      OrderPrice: 0,
      OrderTime: '',

      BuyerNameFilter: '',
      ordersWithoutFilter: [],
    }
  }

  componentDidMount() {
    this.refreshList()
  }

  refreshList() {
    fetch(variables.API_URL + 'order')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ orders: data, ordersWithoutFilter: data })
      })
  }

  filterFn() {
    var BuyerNameFilter = this.state.BuyerNameFilter

    var filteredData = this.state.ordersWithoutFilter.filter(function (el) {
      return el.BuyerName.toLowerCase().includes(
        BuyerNameFilter.trim().toLowerCase()
      )
    })

    this.setState({ orders: filteredData })
  }

  changeBuyerNameFilter = (e) => {
    this.state.BuyerNameFilter = e.target.value
    this.filterFn()
  }

  render() {
    const { orders } = this.state

    return (
      <div>
        <input
          className="form-control m-2"
          onChange={this.changeBuyerNameFilter}
          placeholder="Filter by name"
        ></input>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Buyer Id</th>
              <th>Buyer Name</th>
              <th>Order Price</th>
              <th>Order Time</th>

              {/* <th>
                <input
                  className="form-control m-2"
                  onChange={this.changeEmployeeNameFilter}
                  placeholder="Filter by name"
                ></input>
                Employee Name
              </th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => (
              <tr key={ord.OrderId}>
                <td>{ord.OrderId}</td>
                <td>{ord.BuyerId}</td>
                <td>{ord.EmployeeName}</td>
                <td>{ord.OrderPrice}</td>
                <td>{ord.OrderTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
