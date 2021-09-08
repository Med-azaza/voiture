import React from 'react'
import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'
import './Voiture.css'
export default function Voiture({voiture}) {
    return (
        <Card className="my-3 p-3">
            <Link to={`/voiture/${voiture._id}`}>
                <div className="card_img">
                <Card.Img src={voiture.image} variant='top' className="img" alt="car"/>
                </div> 
            </Link>
            <Card.Body className="mycard">
            <Link to={`/voiture/${voiture._id}`}>

                <Card.Title className="name">
                    <h5>{voiture.name}</h5>
                </Card.Title>
                </Link>
                <Card.Text className="ml-5">
                    <Rating value={voiture.rating} text={`${voiture.numReviews} reviews`} color='#ED2245'/>
                </Card.Text>
                <Card.Text as='div' className="acc">Acceleration: {voiture.acceleration}</Card.Text>
                <Link to={`/voiture/${voiture._id}`}><div className="btn">View Details</div></Link> 
            </Card.Body>
        </Card>
    )
}
