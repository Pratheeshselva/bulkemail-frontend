import React, { useEffect, useState } from 'react'
import TopBar from './common/TopBar'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'
import Cardskeleton from './Cardskeleton'
import useLogout from '../hooks/useLogout'
import api from '../service/apiService'
import { Button } from 'react-bootstrap'
import SendersAddressSchema from '../Schemas/SendersAddressSchema'
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';



function SendersAddress() {

  const logout = useLogout()

  let [data, setData] = useState([])

  const sendersData = async () => {
    try {
      let response = await api.get(ApiRoutes.GET_SENDERS_ADDRESS.path, { authenticate: ApiRoutes.GET_SENDERS_ADDRESS.authenticate })
      setData(response.data)


    } catch (error) {

      if (error.response.status === 401) {
        logout()
      }
      toast.error(error.response.data.message || "Error Occured While Fetching Senders Address")
    }
  }

  useEffect(() => {
    sendersData()
  }, [])

  const SaveSendersAddress = async (data) => {
    try {
      let response = await api.post(ApiRoutes.SAVE_SENDERS_ADDRESS.path, data, {
        authenticate: ApiRoutes.SAVE_SENDERS_ADDRESS.authenticate
      })
      toast.success(response.message)
      setData((prevData) => [...prevData, data])
      sendersData()


    } catch (error) {
      toast.error(error.response?.data?.message || "An Error Occurred")
    }
  }

  const deleteSendersAddress = async (id) => {
    try {
      await api.delete(`${ApiRoutes.DELETE_SENDERS_ADDRESS.path}/${id}`, { authenticate: ApiRoutes.DELETE_SENDERS_ADDRESS.authenticate })
      toast.success("Deletion Succesfull")
      setData((prevData) => prevData.filter(item => item.id !== id))

    } catch (error) {

      toast.error(error.response?.data?.message || "An Error Occurred While Deleting");
    }
  }



  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      user: "",
      password: ""
    },
    validationSchema: SendersAddressSchema,
    onSubmit: (values, actions) => {
      SaveSendersAddress(values)
      actions.resetForm()
    },
  })
  return <>
    <TopBar /><br></br>
    <div className='apppassword'>Link to create app password - <a href="https://myaccount.google.com/apppasswords" target="_blank">https://myaccount.google.com/apppasswords</a><br/>Paste the app password without any spaces in-between them</div>
    <div className='createaddressbuttonwrapper'>
      <div className='formwrapper'>
        <Form onSubmit={handleSubmit}>
          <div className='row mb-6'>
            <div className='col-md-4'>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" id="user" onChange={handleChange} value={values.user} className={errors.user && touched.user ? 'error' : ''}
                  onBlur={handleBlur} />
                {errors.user && touched.user && <p className='error'>{errors.user} </p>}

              </Form.Group>
            </div>
            <div className='col-md-4'>

              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="password" placeholder="Password" onChange={handleChange} value={values.password} className={errors.password && touched.password ? 'error' : ''}
                  onBlur={handleBlur} />
                {errors.password && touched.password && <p className='error'>{errors.password} </p>}

              </Form.Group>
            </div>
            <div className='col-md-4 createaddressbutton'>
              <Button variant="outline-success" type="submit">
                <i className="bi bi-plus-lg"></i> Create
              </Button>  </div></div>
        </Form>
      </div>
    </div>

    <div className='Senderaddresswrapper'>
      {
        data.map((e) => {
          return <Cardskeleton data={e} key={e.id} onDelete={() => deleteSendersAddress(e.id)} />
        })
      }
    </div>
  </>
}

export default SendersAddress