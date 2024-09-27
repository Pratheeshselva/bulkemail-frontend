import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import React from 'react';
import { Button } from 'react-bootstrap';
import useLogout from '../../hooks/useLogout'


function TopBar() {

    let options=[
      {
        value:'Home',
        path:'/',
        role:["admin","user"]
    },
        {
            value:'Senders Address',
            path:'/addsendersaddress',
            role:["admin","user"]
        },
        {
          value:'Create Template',
          path:'/createtemplate',
          role:["admin","user"]
      },
        {
            value:'Users',
        path:'/users',
        role:["admin"]
        }
    ]

    const role = sessionStorage.getItem('role')
    const logout = useLogout()
  return <>
   <Navbar expand="lg" className="bg-body-tertiary">
  <Container>    
     <Navbar.Brand className=''><Link to='/' className='removedecor'>Bulk Mailer</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {
            options.filter((option)=>option.role.includes(role)).map((e)=>{
                return   <Nav.Link key={e.path} to={e.path} as={Link} >{e.value}</Nav.Link>
            })
          }
         
          </Nav>
          <Button variant="outline-danger" onClick={()=>logout()}>Log Out</Button>
        </Navbar.Collapse>
        </Container>
   
    </Navbar>

  </>
}

export default TopBar