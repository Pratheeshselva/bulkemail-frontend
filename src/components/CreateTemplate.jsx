import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button } from 'react-bootstrap'
import ApiRoutes from '../utils/ApiRoutes'
import CreateTemplateSchema from '../Schemas/CreateTemplateSchema'
import { Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import api from '../service/apiService'
import TopBar from './common/TopBar'



function CreateTemplate() {
  const navigate = useNavigate()
  const createAndPostTemplate =  async(data) => {
    try {
     let response = await api.post(ApiRoutes.CREATE_TEMPLATE.path,data,{authenticate:ApiRoutes.CREATE_TEMPLATE.authenticate})
      toast.success(response.message)
      navigate('/')
    } catch (error) {
      toast.error(error.message || "An Error Occurred")
    }
  }



  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      templatename:"",
      subject:"",
      body:"",

    },
    validationSchema: CreateTemplateSchema,
    onSubmit: (values, actions) => {
      createAndPostTemplate(values)
      actions.resetForm();

    },
  })
  return <>
    <TopBar />
    <div className='form-wrapper'>
      <div className='form'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Template Name</Form.Label>
            <Form.Control type="text" id='templatename' placeholder="Enter template name" onChange={handleChange} value={values.templatename} className={errors.templatename && touched.templatename ? 'error' : ''}
              onBlur={handleBlur} />
            {errors.templatename && touched.templatename && <p className='error'>{errors.templatename} </p>}
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" id='subject' placeholder="Subject" onChange={handleChange} value={values.subject} className={errors.subject && touched.subject ? 'error' : ''}
              onBlur={handleBlur} />
            {errors.subject && touched.subject && <p className='error'>{errors.subject} </p>}
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Body</Form.Label>
            <Form.Control as='textarea' id='body' rows={10} placeholder="Enter body description" onChange={handleChange} value={values.body} className={errors.body && touched.body ? 'error' : ''}
              onBlur={handleBlur} />
            {errors.body && touched.body && <p className='error'>{errors.body} </p>}
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  </>
}

export default CreateTemplate