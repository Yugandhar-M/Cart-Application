import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {DLT,ADD,REMOVE} from '../redux/actions/action';

const CardDetails = () => {

    const [data, setData] = useState([]);
    const [title,setTitle] = useState("");

    const { id } = useParams();

    const history = useNavigate();

    const dispatch = useDispatch()

    const dlt = (id)=>{
        dispatch(DLT(id));
        history('/');
    }

    const getdata = useSelector((state) => state.cartreducer.carts);

    const compare = async () => {
        let comparedata = getdata.filter((e) => {
            
            return e.id === parseInt(id)
        });
        // console.log(`Title from compare funct: ${comparedata[0].rname}`)

        await setTitle(comparedata[0].rname)
        await setData(comparedata)
    }
    
    const send = (e)=>{
        dispatch(ADD(e));
    }

    const remove=(item)=>{
        dispatch(REMOVE(item));
    }

    useEffect(() => {
        compare();
        document.title = title;
    }, [id,title])

    return (
        <>
            <div className='container mt-2'>
                <h2 className='text-center'>Item Details</h2>
                <section className='container mt-3'>
                    <div className='itemsdetails'>
                        {
                            data.map((e) => {
                                return (
                                    <div key={e.id}>
                                        <div className='items_img'>
                                            <img src={e.imgdata} alt="" />
                                        </div>
                                        <div className='details'></div>
                                        <Table>
                                            <tr>
                                                <td>
                                                    <p><strong>Restaurant</strong> : {e.rname}</p>
                                                    <p><strong>Price</strong> : ₹{e.price}</p>
                                                    <p><strong>Dishes</strong> : {e.address}</p>
                                                    <p><strong>Total</strong> : ₹{e.price*e.qnty}</p>
                                                    <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                                                        <span style={{fontSize:24}} onClick={e.qnty<=1?()=>dlt(e.id):()=>remove(e)}>-</span>
                                                        <span style={{fontSize:20}}>{e.qnty}</span>
                                                        <span style={{fontSize:24}} onClick={()=>send(e)}>+</span> 
                                                    </div>
                                                </td>
                                                <td>
                                                    <p><strong>Rating</strong><span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{e.rating} ★</span></p>
                                                    <p><strong>Order Review :</strong><span>{e.somedata}</span></p>
                                                    <p><strong>Remove : </strong><span><i className='fas fa-trash' onClick={()=>dlt(e.id)} style={{ color: 'red', fontSize: 20, cursor: "pointer" }}></i></span></p>
                                                </td>
                                            </tr>
                                        </Table>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </div>
        </>
    )
}

export default CardDetails