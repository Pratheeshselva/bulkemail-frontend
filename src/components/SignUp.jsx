import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import { SignUpSchema } from '../Schemas/LoginSignUpSchema';
import api from '../service/apiService'
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




function signup() {
  const navigate = useNavigate()

  const handleSignUp = async (data) => {
    try {
      let response = await api.post(ApiRoutes.SIGNUP.path, data, {
        authenticate: ApiRoutes.SIGNUP.authenticate
      })
      toast.success(response.message)
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.message || "An Error Occurred")
    }
  }

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: ""
    },
    validationSchema: SignUpSchema,
    onSubmit: (values, actions) => {
      handleSignUp(values)
      actions.resetForm()


    },
  })


  return <>
    <div className='form-wrapper'>
      <div className='form'>
        <h1>Welcome to Bulk Mailer!</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className={errors.name && touched.name ? 'error' : ''} />
            {errors.name && touched.name && <p className='error'>{errors.name} </p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" id="email" onChange={handleChange} value={values.email} className={errors.email && touched.email ? 'error' : ''}
              onBlur={handleBlur} />
            {errors.email && touched.email && <p className='error'>{errors.email} </p>}
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" id="password" placeholder="Password" onChange={handleChange} value={values.password} className={errors.password && touched.password ? 'error' : ''}
              onBlur={handleBlur} />
            {errors.password && touched.password && <p className='error'>{errors.password} </p>}
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" id="confirmpassword" onChange={handleChange} value={values.confirmpassword} className={errors.confirmpassword && touched.confirmpassword ? 'error' : ''}
              onBlur={handleBlur} />
            {errors.confirmpassword && touched.confirmpassword && <p className='error'>{errors.confirmpassword} </p>}<br></br>
            <p>Alredy have an account? <Link to='/login'> Login Here!</Link></p>
          </Form.Group>
          <Button variant="primary" type="submit" className='disablebutton'>
            Submit
          </Button>
        </Form>

      </div>
    </div>
  </>
}

export default signup