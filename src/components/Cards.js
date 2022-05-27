import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardsData from './CardsData';
import "./style.css";
import {useDispatch} from 'react-redux';
import {ADD} from '../redux/actions/action';
import {useEffect} from 'react';

const Cards = () => {

    const [data, setData] = useState(CardsData);
    const dispatch = useDispatch();
    const send=(e)=>{
        dispatch(ADD(e));
    };

    useEffect(()=>{
        document.title='Home Page';
    },[])

    return (

        <div className='container mt-3'>
            <h2 className='text-center'>Add to Cart</h2>

            <div className='row d-flex justify-content-center align-items-center' >{
                data.map((element, id) => {
                    return (
                        <Card key={id} style={{ width: '22rem', border: "none" }} className="mx-2 mt-4 card_style">
                            <Card.Img variant="top" src={element.imgdata} style={{ height: "12rem" }} />
                            <Card.Body>
                                <Card.Title>{element.rname}</Card.Title>
                                <Card.Text>
                                    Price: ₹{element.price}
                                    {element.Text}
                                </Card.Text>
                                <div className='button_div d-flex justify-content-center'>
                                    <Button variant="primary"
                                    onClick={()=>send(element)} className='col-lg-12'>Add To Cart</Button>
                                </div>
                            </Card.Body> 
                        </Card>
                    )
                })
            }


            </div>
        </div>
    )
}

export default Cards