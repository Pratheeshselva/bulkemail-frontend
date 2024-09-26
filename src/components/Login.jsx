import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { LoginSchema } from '../Schemas/LoginSignUpSchema';
import { useFormik } from 'formik';
import api from '../service/apiService'
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




function Login() {

  const navigate = useNavigate()

  const handleLogin = async (data) => {

    try {

      let response = await api.post(ApiRoutes.LOGIN.path, data, {
        authenticate: ApiRoutes.LOGIN.authenticate
      })
      toast.success(response.message)
      sessionStorage.setItem("token", response.token)
      sessionStorage.setItem("role", response.role)
      navigate('/home')
    } catch (error) {
      toast.error(error.response.data.message || "An Error Occurred")
    }
  }

  useEffect(() => {
    sessionStorage.clear()
  }, [])


  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {
      handleLogin(values)
      actions.resetForm()
    },
  })
  return <>
    <div className='form-wrapper'>
      <div className='form'>
        <h1>Welcome to Bulk Mailer!</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" id="email" onChange={handleChange} value={values.email} className={errors.email && touched.email ? 'error' : ''}
              onBlur={handleBlur} />
            {errors.email && touched.email && <p className='error'>{errors.email} </p>}

          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" id="password" placeholder="Password" onChange={handleChange} value={values.password} className={errors.password && touched.password ? 'error' : ''}
              onBlur={handleBlur} />
            {errors.password && touched.password && <p className='error'>{errors.password} </p>}
            <br></br>
            <p>Don't have an account? <Link to='/signup'> Register Here!</Link></p>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  </>
}

export default Login