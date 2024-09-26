import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function TemplateCard({data,onClick,onDelete}) {
  return <>
  <div className='templatewrapper'>
   <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{data.subject}</Card.Title>
        <Card.Text className='templateparagraph'>
         {data.templatename}
        </Card.Text>
        <Button variant="primary" onClick={onClick}>View</Button> &nbsp; &nbsp;
        <Button variant="danger" onClick={onDelete}>Delete</Button>
      </Card.Body>
    </Card>
    </div>
  </>
}

export default TemplateCard