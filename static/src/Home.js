import React,{useEffect} from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {getVoitures} from './actions/voitureActions'
import Message from './Components/Message'
import Loader from './Components/Loader'
import Voiture from './Components/Voiture'
import Header from './Header/Header'
import './Components/Voiture.css'
export default function Home() {

    const dispatch=useDispatch()
    const voitureList=useSelector(state=>state.voitureList)

    const {loading, error, voitures }=voitureList
      useEffect(() =>{
        dispatch(getVoitures())

    }, [dispatch]);
    
console.log(voitures)
    return (
        <>
        <Header/>    
    <Container>
    <h1 className="mt-5 centerh">Voitures</h1>

        {loading ? (
          <Loader/>         ) : error ? (
            <Message variant='danger'>{error}</Message>) : ( 
            
         <Row>
           
             {voitures.map((voiture)=>(
             <Col key={voiture._id} sm={12} md={6} lg={4} xl={4}>
                 <Voiture voiture={voiture}/>
             </Col>
             ))}
        </Row> 
        
            )}

     </Container> 
     </>  
        )
        }