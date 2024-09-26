import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react'




function Cardskeleton({ data, onDelete }) {
  const { user } = data
  return <>
    <div className='cradWrapper'>
      <Card style={{ width: '20rem' }}>
        <Card.Body className='cardbody'>
          <Card.Text>
            {user} &nbsp;&nbsp;&nbsp;&nbsp;


          </Card.Text>
          <Button variant="danger" onClick={onDelete} className='deleteicon'><i className="bi bi-trash3"></i>
          </Button>
        </Card.Body>
      </Card>
    </div>
  </>
}

export default Cardskeleton