import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../service/apiService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import Topbar from '../components/common/TopBar'
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import Papa from 'papaparse'



function SingleTemplate(state) {
    const location = useLocation();
    const template = location.state?.template
    let navigate = useNavigate()

    const [senders, setSenders] = useState([])
    const [loading, setLoading] = useState(false)
    const [quillValue, setQuillValue] = useState(template?.html || '')
    const [textformatting, setTextFormatting] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        fetchsendersAddress()
    }, [])

    const handleQuillChange = (content) => {
        setQuillValue(content);
    }

    const handleFileChange = (e) => {

        const file = e.target.files[0]
        const fileType = file.type
        const fileSize = file.size
        const maxSize = 10 * 1024 * 1024
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4', 'text/csv']
        if (file) {
            if (!allowedTypes.includes(fileType)) {
                toast.error('Unsupported file type')
                setSelectedFile(null)
                e.target.value = ''
                return
            }
            if (fileSize > maxSize) {
                toast.error('File size exceeds 10 MB limit')
                setSelectedFile(null);
                e.target.value = "";
                return;
            }
            setFieldValue('attachments', file)
            setSelectedFile(file)

        }
        else {
            setFieldValue('attachments', null)
            setSelectedFile(null)
        }

    }

    const fetchsendersAddress = async () => {
        try {
            const response = await api.get(ApiRoutes.GET_SENDERS_ADDRESS.path, {
                authenticate: ApiRoutes.GET_SENDERS_ADDRESS.authenticate
            })

            if (response.data && response.data.length >= 1) {
                setSenders(response.data)

            }
            else {
                toast.error('No Senders Address Found')
            }

        } catch (error) {
            console.error('Error fetching senders:', error);
        }
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email);
    }


    const handleImportChange = async (e) => {
        try {

            const file = e.target.files[0]
            const allowedTypes = ['text/csv']
            const maxSize = 10 * 1024 * 1024

            if (file) {
                if (!allowedTypes.includes(file.type)) {
                    toast.error('Unsupported file type. Only CSV files are allowed.')
                    setFieldValue('import', null)
                    e.target.value = ''
                    return
                }
                if (file.size > maxSize) {
                    toast.error('File size exceeds 10 MB limit.');
                    setFieldValue('import', null);
                    e.target.value = '';
                    return;
                }

                Papa.parse(file, {
                    header: true,
                    complete: (result) => {
                        const emailColumnexist = result.meta.fields.includes('emails')
                        if (!emailColumnexist) {
                            toast.error('The CSV file must contain a column named "emails".')
                            setFieldValue('import', null);
                            e.target.value = '';
                            return;
                        }
                        const emails = result.data
                            .map(row => row.emails && row.emails.trim())
                            .filter(email => email && isValidEmail(email))

                        setFieldValue('to', emails)

                        toast.success(`${emails.length} emails extracted successfully.`)
                    }
                })

            }

        } catch (error) {
            console.error(error);
            toast.error('Error parsing CSV file.')
        }
    }




    const sendMail = async (data) => {
        try {


            const formData = new FormData()
            formData.append('from', data.from);
            formData.append('password', data.password);
            formData.append('username', data.username);
            formData.append('to', data.to);
            formData.append('subject', data.subject);
            formData.append('cc', data.cc || '');
            formData.append('bcc', data.bcc || '');
            formData.append('templatename', data.templatename);
            formData.append('body', !textformatting ? data.body : '');
            formData.append('html', textformatting ? quillValue : '');

            if (selectedFile) {
                formData.append('attachments', selectedFile);


            }

            setLoading(true)


            let response = await api.post(ApiRoutes.SEND_EMAIL.path, formData, {
                authenticate: ApiRoutes.SEND_EMAIL.authenticate, headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success(response.message)
            setLoading(false)
            navigate('/')

        } catch (error) {
            setLoading(false)

            toast.error(error.response?.message || "An Error Occurred")
        }
    }

    const saveEditedTemplated = async (data) => {
        try {
            const updatedData = { ...data, body: !textformatting ? data.body : '', html: textformatting ? quillValue : '' }
            let response = await api.put(ApiRoutes.SAVE_EDITED_TEMPLATE.path, updatedData, { authenticate: ApiRoutes.SAVE_EDITED_TEMPLATE.authenticate })
            toast.success(response.message || "Template updated successfully!");
            navigate('/')


        } catch (error) {

            toast.error(error.response?.message || "An Error Occurred")
        }
    }


    const { values, handleSubmit, errors, touched, getFieldProps, setFieldValue } = useFormik({
        initialValues: {
            from: '',
            password: template?.password || '',
            subject: template?.subject || '',
            body: template?.body || '',
            cc: template?.cc || '',
            bcc: template?.bcc || '',
            templatename: template?.templatename,
            username: template?.username || '',
            id: template ? template.id : '',
            to: '',
            html: template?.html || '',
            attachments: '',



        },
        validationSchema: Yup.object({
            from: Yup.string().required('Required'),
            subject: Yup.string().required('Required'),
            body: Yup.string(),
            cc: Yup.string().email('Please enter a valid email'),
            bcc: Yup.string().email('Please enter a valid email'),
            templatename: Yup.string(),
            password: Yup.string().required("Required"),
            username: Yup.string().required('Required'),
            id: Yup.string().required('Required'),
            html: Yup.string(),
            to: Yup.mixed().required('Required')
            ,
            attachments: Yup.mixed(),


        }),
        onSubmit: (values) => {
            sendMail(values)
        },
    })

    return <>
        <Topbar />
        <div className='sendmailboxwrapper'>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>From</Form.Label>
                    <Form.Control as='select' placeholder="Enter subject"   {...getFieldProps('from')} className={errors.from && touched.from ? 'error' : ''}>
                        <option value="">Select Sender</option>
                        {
                            senders.map((sender) => (
                                <option key={sender.id} value={sender.user}>{sender.user}</option>
                            ))
                        }
                    </Form.Control>
                    {errors.from && touched.from && <p className='error'>{errors.from} </p>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter the app password that you have generated through Google account "   {...getFieldProps('password')} className={errors.password && touched.password ? 'error' : ''}
                    />
                    {errors.password && touched.password && <p className='error'>{errors.password} </p>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username"   {...getFieldProps('username')} className={errors.username && touched.username ? 'error' : ''}
                    />
                    {errors.username && touched.username && <p className='error'>{errors.username} </p>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>To</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter to address" accept='.csv' {...getFieldProps('to')} className={errors.to && touched.to ? 'error' : ''}
                    />
                    {errors.to && touched.to && <p className='error'>{errors.to} </p>}
                </Form.Group>
                <Form.Group className="mb-3">

                    <Form.Control type="file" placeholder="Import recepient emails" onChange={handleImportChange} className={errors.importedemail && touched.importedemail ? 'error' : ''}
                    />
                    {errors.importedemail && touched.importedemail && <p className='error'>{errors.importedemail} </p>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Enter subject"   {...getFieldProps('subject')} className={errors.subject && touched.subject ? 'error' : ''}
                    />
                    {errors.subject && touched.subject && <p className='error'>{errors.subject} </p>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Cc</Form.Label>
                    <Form.Control type="text" placeholder="CC Emails Goes Here"   {...getFieldProps('cc')} className={errors.cc && touched.cc ? 'error' : ''}
                    />
                    {errors.cc && touched.cc && <p className='error'>{errors.cc} </p>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Bcc</Form.Label>
                    <Form.Control type="text" placeholder="BCC Emails Goes Here"   {...getFieldProps('bcc')} className={errors.bcc && touched.bcc ? 'error' : ''}
                    />
                    {errors.bcc && touched.bcc && <p className='error'>{errors.bcc} </p>}
                </Form.Group>


                <Form.Group>
                    <Form.Label>Need Text Formatting?</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Plain Text"
                        checked={!textformatting}
                        onChange={() => setTextFormatting(false)}
                    />
                    <Form.Check
                        type="radio"
                        label="Rich Text"
                        checked={textformatting}
                        onChange={() => setTextFormatting(true)}
                    />
                    <br />
                </Form.Group>
                {
                    textformatting ? <ReactQuill theme="snow" value={quillValue} onChange={handleQuillChange} /> :
                        <Form.Group className="mb-3" >
                            <Form.Label>Body</Form.Label>
                            <Form.Control as="textarea" rows={10} value={values.body}  {...getFieldProps('body')} className={errors.body && touched.body ? 'error' : ''}
                            />
                            {errors.body && touched.body && <p className='error'>{errors.body} </p>}
                        </Form.Group>
                }
                <br />
                <Form.Group className="mb-3">
                    <Form.Label>Attachments</Form.Label>
                    <Form.Control type="file" placeholder="chooseyourfile" name='attachments' onChange={handleFileChange} className={errors.attachments && touched.attachments ? 'error' : ''}
                    />
                    {errors.attachments && touched.attachments && <p className='error'>{errors.attachments} </p>}
                </Form.Group>


                <br />
                <div className='buttonswrappertemplate'>
                    <Button variant="primary" onClick={() => saveEditedTemplated(values)}>
                        Save Changes
                    </Button>&nbsp;&nbsp;&nbsp;
                    {
                        loading ? <div className='spinnerdiv'><Spinner animation='border' role='status'><span className='visually-hidden'>Sending email...</span></Spinner></div> :
                            <Button variant="success" type="submit"   >
                                Send
                            </Button>
                    }
                </div>
            </Form>

        </div>

    </>

}

export default SingleTemplate