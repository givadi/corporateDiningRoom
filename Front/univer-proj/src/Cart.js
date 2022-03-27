import React, { Component } from 'react'
import { variables } from './Variables'

export class Cart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dishes: [],
      DishName: '',
      DishPrice: 0,
      ServingTime: 0,
      DishPhotoFile: 'default.png',
      DishPhotoPath: variables.PHOTO_URL,
      DishId: 0,

      order: [],
      OrderBuyerId: 1,
      OrderBuyerName: '',
      OrderPrice: 0,

      employeers: [],
    }
  }

  componentDidMount() {
    this.refreshList()
  }

  refreshList() {
    let dateTime = new Date().toISOString()
    console.log(dateTime)
    fetch(variables.API_URL + 'dish')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ dishes: data })
      })

    fetch(variables.API_URL + 'employee')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employeers: data })
      })
  }

  addDishToCart(id) {
    // this.state.order.push(id)
    // this.setState({ order: this.state.order })
    // console.log(this.state.order)
  }

  addItem(e, id, name, price) {
    e.preventDefault()

    const newItem = [id, name, price]

    this.setState({
      order: [...this.state.order, newItem],
    })
  }

  removeItem(e, index) {
    e.preventDefault()

    var array = [...this.state.order]
    if (index !== -1) {
      array.splice(index, 1)
      this.setState({ order: array })
    }
  }

  changeOrderBuyer = (e) => {
    this.setState({
      OrderBuyerId:
        e.target.options[e.target.options.selectedIndex].getAttribute(
          'data-key'
        ),
      OrderBuyerName: e.target.options[e.target.options.selectedIndex].value,
    })
  }

  buyCartClick() {
    const { order } = this.state.order

    let orderPrice = 0
    this.state.order.forEach((ord) => {
      orderPrice += ord[2]
    })

    this.setState({
      modalTitle: 'Choose Employee',
      OrderPrice: orderPrice,
    })
  }

  addNewOrderToEmployee() {
    let dateTime = new Date().toISOString()

    fetch(variables.API_URL + 'order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BuyerId: this.state.OrderBuyerId,
        OrderPrice: this.state.OrderPrice,
        OrderTime: dateTime,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result)
          this.refreshList()
        },
        (error) => {
          alert('Creation failed')
        }
      )

    this.setState({
      order: [],
    })
  }

  render() {
    const {
      dishes,
      modalTitle,
      DishPhotoPath,

      order,
      OrderBuyerName,
      OrderPrice,

      employeers,
    } = this.state

    return (
      <div>
        <h2 className="app__title">Cart page</h2>

        <div className="d-flex flex-row">
          <div className="d-flex flex-row flex-xl-wrap justify-content-around">
            {dishes.map((dish) => (
              <div
                className="card p-2 "
                style={{ width: '25rem', marginBottom: '20px' }}
              >
                <img
                  className="card-img-top"
                  src={DishPhotoPath + dish.DishPhotoFile}
                  alt="..."
                  width="300"
                  height="300"
                />
                <div className="card-body">
                  <h5 className="card-title">{dish.DishName}</h5>
                  <p className="card-text">{dish.DishPrice} rub</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) =>
                      this.addItem(
                        e,
                        dish.DishId,
                        dish.DishName,
                        dish.DishPrice
                      )
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              width: '40rem',
              marginBottom: '20px',
              marginLeft: '20px',
            }}
          >
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                Cart consist of {order.length} items
                {order.length !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.buyCartClick()}
                  >
                    Buy
                  </button>
                ) : null}
              </li>

              {order.map((ord, index) => (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {index + 1}. {ord[1]}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => this.removeItem(e, index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div
                  className="input-group-text"
                  style={{ marginBottom: '15px' }}
                >
                  Purchase costs {OrderPrice}
                </div>
                <div className="input-group">
                  <span className="input-group-text">Employee Name</span>
                  <select
                    className="form-select"
                    onChange={this.changeOrderBuyer}
                    value={OrderBuyerName}
                  >
                    {employeers.map((emp) => (
                      <option key={emp.EmployeeId} data-key={emp.EmployeeId}>
                        {emp.EmployeeName}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="btn btn-primary float-end"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ marginTop: '15px' }}
                  onClick={() => this.addNewOrderToEmployee()}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
