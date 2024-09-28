import React from 'react'
import Topbar from '../components/common/TopBar'
import ApiRoutes from '../utils/ApiRoutes'
import { useState, useEffect } from 'react'
import api from '../service/apiService'
import TemplateCard from './TemplateCard'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from 'react-bootstrap'

function Home() {

  const navigate = useNavigate()

  const [templates, setTemplates] = useState([])
  const [selectedtemplate, setSelectedTemplate] = useState([])

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async (req, res) => {
    try {
      const response = await api.get(ApiRoutes.GET_ALL_TEMPLATES.path, { authenticate: ApiRoutes.GET_ALL_TEMPLATES.authenticate })
      setTemplates(response.templates)

    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  }
  const handleSelectedTemplate = (template) => {
    setSelectedTemplate(template)
    navigate('/fulltemplate', { state: { template } })
  }

  const deleteTemplate = async (id) => {
    try {

      await api.delete(`${ApiRoutes.DELETE_TEMPLATES.path}/${id}`, { authenticate: ApiRoutes.DELETE_TEMPLATES.authenticate })
      toast.success("Deletion Succesfull")
      fetchTemplates()
    } catch (error) {
      toast.error(error.response?.message || "An Error Occurred")
    }
  }

  return <>
    <Topbar />
    <div className='templatedahboard'>
    <h3>Templates</h3></div>
    <div className='wholetemplatewrapper'>
   
      {
        templates.map((e) => (
          <TemplateCard data={e} key={e.id} onClick={() => handleSelectedTemplate(e)} onDelete={() => deleteTemplate(e.id)} />
        ))
      }
    </div>
  </>
}

export default Home