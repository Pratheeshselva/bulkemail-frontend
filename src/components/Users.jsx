import React from 'react'
import Topbar from '../components/common/TopBar'
import { useEffect, useState } from 'react'
import api from '../service/apiService'
import ApiRoutes from '../utils/ApiRoutes'
import { Table } from 'react-bootstrap'


function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = async (req, res) => {
    try {
      const response = await api.get(ApiRoutes.GET_ALL_USERS.path, { authenticate: ApiRoutes.GET_ALL_USERS.authenticate })


      setUsers(response.data)
      res.status(200).send({ message: "Data fetch successfull" })

    } catch (error) {
      res.status(400).send({ message: `${error}` })
    }
  }


  return <>
    <Topbar />
    <div className="container mt-4">
      <h2>Users</h2>
      {users.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>

              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No users found</p>
      )}
    </div>

  </>
}

export default Users