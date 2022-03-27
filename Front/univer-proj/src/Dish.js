import React, { Component } from 'react'
import { variables } from './Variables'

export class Dish extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dishes: [],
      modalTitle: '',
      DishName: '',
      DishPrice: 0,
      ServingTime: 0,
      DishPhotoFile: 'default.png',
      DishPhotoPath: variables.PHOTO_URL,
      DishId: 0,
    }
  }

  refreshList() {
    fetch(variables.API_URL + 'dish')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ dishes: data })
      })
  }

  sortResult(prop, asc) {
    var sortedData = this.state.dishes.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0
      }
    })

    this.setState({ dishes: sortedData })
  }

  componentDidMount() {
    this.refreshList()
  }

  changeDishName = (e) => {
    this.setState({ DishName: e.target.value })
  }

  changeDishPrice = (e) => {
    this.setState({ DishPrice: e.target.value })
  }

  changeServingTime = (e) => {
    this.setState({ ServingTime: e.target.value })
  }

  changeDishPhotoFile = (e) => {
    this.setState({ DishPhotoFile: e.target.value })
  }

  addNewDishClick() {
    this.setState({
      modalTitle: 'Add new dish',
      DishName: '',
      DishPrice: 0,
      ServingTime: 0,
      DishPhotoFile: 'default.png',
      DishId: 0,
    })
  }

  createNewDishClick() {
    fetch(variables.API_URL + 'dish', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        DishName: this.state.DishName,
        DishPrice: this.state.DishPrice,
        ServingTime: this.state.ServingTime,
        DishPhotoFile: this.state.DishPhotoFile,
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
  }

  editDishClick(dish) {
    this.setState({
      modalTitle: 'Edit dish',
      DishName: dish.DishName,
      DishId: dish.DishId,
      DishPrice: dish.DishPrice,
      DishPhotoFile: dish.DishPhotoFile,
      ServingTime: dish.ServingTime,
    })
  }

  updateDishClick() {
    fetch(variables.API_URL + 'dish', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        DishId: this.state.DishId,
        DishName: this.state.DishName,
        DishPrice: this.state.DishPrice,
        ServingTime: this.state.ServingTime,
        DishPhotoFile: this.state.DishPhotoFile,
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
  }

  deleteDishClick(id) {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      fetch(variables.API_URL + 'dish/' + id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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
    }
  }

  imageUpload = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', e.target.files[0], e.target.files[0].name)
    console.log(e.target.files[0])

    console.log(e.target.files[0].name)

    fetch(variables.API_URL + 'dish/SaveFile', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.setState({ DishPhotoFile: data })
      })
  }

  render() {
    const {
      dishes,
      modalTitle,
      DishName,
      DishId,
      DishPrice,
      ServingTime,
      DishPhotoFile,
      DishPhotoPath,
    } = this.state

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addNewDishClick()}
        >
          Add new dish
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Dish Id</th>
              <th>
                <div className="d-flex flex-row align-items-center">
                  Dish Name
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult('DishName', false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult('DishName', true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                      />
                    </svg>
                  </button>
                </div>
              </th>
              <th>
                <div className="d-flex flex-row align-items-center">
                  Dish Price
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult('DishPrice', false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult('DishPrice', true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                      />
                    </svg>
                  </button>
                </div>
              </th>
              <th>Serving Time</th>
              <th>Dish Photo File</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish.DishId}>
                <td>{dish.DishId}</td>
                <td>{dish.DishName}</td>
                <td>{dish.DishPrice}</td>
                <td>{dish.ServingTime}</td>
                <td>{dish.DishPhotoFile}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editDishClick(dish)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteDishClick(dish.DishId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-octagon"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Dish Name</span>
                      <input
                        type="text"
                        className="form-control"
                        value={DishName}
                        onChange={this.changeDishName}
                      ></input>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Dish Price</span>
                      <input
                        type="number"
                        className="form-control"
                        value={DishPrice}
                        onChange={this.changeDishPrice}
                      ></input>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Serving Time</span>
                      <input
                        type="number"
                        className="form-control"
                        value={ServingTime}
                        onChange={this.changeServingTime}
                      ></input>
                    </div>
                  </div>

                  <div className="p-2 w-50 bd-highlight">
                    <img
                      width="250"
                      height="250"
                      src={DishPhotoPath + DishPhotoFile}
                    ></img>
                    <input
                      className="m-2"
                      type="file"
                      onChange={this.imageUpload}
                    ></input>
                  </div>
                </div>

                {DishId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createNewDishClick()}
                  >
                    Create
                  </button>
                ) : null}

                {DishId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateDishClick()}
                  >
                    Edit
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
