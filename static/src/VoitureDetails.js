import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Container, Button, Carousel, Form} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Components/Rating";
import Loader from "./Components/Loader";
import Message from "./Components/Message";
import  {ListVoitureDetails, createvoitureReview,
} from './actions/voitureActions';


import { VOITURE_CREATE_REVIEW_RESET } from './constants/voitureConstants'

export default function VoitureDetails({ history,match }) {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
  const dispatch = useDispatch();
 // const voitureList = useSelector((state) => state.voitureList)
  //const {voitures} = voitureList

  const voitureDetails = useSelector((state) => state.voitureDetails);
  const { loading, error, voiture } = voitureDetails;
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const voitureReviewCreate = useSelector((state) => state.voitureReviewCreate)
  const {
    success: successVoitureReview,
    loading: loadingVoitureReview,
    error: errorVoitureReview,
  } = voitureReviewCreate
 
  useEffect(() => {
    if (successVoitureReview) {
      setRating(0)
      setComment('')

    }
    if (!voiture._id || voiture._id !== match.params.id) {
      dispatch(ListVoitureDetails(match.params.id))
      dispatch({ type: VOITURE_CREATE_REVIEW_RESET })
    }


  }, [dispatch, match, successVoitureReview])


  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createvoitureReview(match.params.id, {
        rating,
        comment,
      })
    )
  }
  return (
    
    
    <Container>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
            <div className="col-dt">
            <Carousel>
              <Carousel.Item>
                <img className="d-block w-100" src={voiture.image} alt={voiture.name}/>
              </Carousel.Item>
              
            </Carousel>
          </div>
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{voiture.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={voiture.rating}
                    text={`${voiture.numReviews} reviews`}
                    color='#ED2245' />
                </ListGroup.Item>
                <ListGroup.Item><h3>Acceleration: {voiture.acceleration}</h3></ListGroup.Item>
                <ListGroup.Item>
                  Description: {voiture.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
           
                      </Row>
                      

          <Row>
            <Col md={6}>
              <h2 className="mt-5">Reviews</h2>
              {voiture.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {voiture.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color='#ED2245'/>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successVoitureReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingVoitureReview && <Loader />}
                  {errorVoitureReview && (
                    <Message variant='danger'>{errorVoitureReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label className='mt-3'>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingVoitureReview}
                        type='submit'
                        variant='primary'
                        className="mt-3"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
     
       <>      
            
    
</>
    </Container>
)
}