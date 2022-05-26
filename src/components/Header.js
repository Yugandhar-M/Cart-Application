import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import {NavLink} from 'react-router-dom';
import {DLT} from '../redux/actions/action';


const Header = () => {

    const [price,setPrice] = useState(0);

    const getdata = useSelector((state) => state.cartreducer.carts);

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(()=>null);
    };


    const dlt=(id)=>{
        dispatch(DLT(id))
    }

    const total = ()=>{
        let price=0;
        getdata.map((ele,id)=>{
            price = ele.price*ele.qnty+price;
        });
        setPrice(price);
    }

    useEffect(()=>{
        total();
    },[total])

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink to="/" className='text-decoration-none text-light mx-3'>Cart Application</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/" className='text-decoration-non text-light'>Home</NavLink>
                    </Nav>

                    <Badge badgeContent={getdata.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <i class="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                    </Badge>

                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    {
                        getdata.length ?
                            <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                                <Table><thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Restaurant Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getdata.map((e)=>{
                                            return (
                                                <>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                            <img src={e.imgdata} style={{width:"5rem", height:"4rem"}} alt=""></img>
                                                        </NavLink>
                                                    </td>
                                                    <td><p>{e.rname}</p>
                                                    <p>Price: ₹{e.price}</p>
                                                    <p>Quantity: {e.qnty}</p>
                                                    </td>
                                                    <td className='mt-5' style={{color:"red", fontSize:20,cursor:"pointer"}}>
                                                     <i className='fas fa-trash' onClick={()=>dlt(e.id)}></i>
                                                    </td>
                                                </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <p className='text-center'>Total :₹{price}</p>
                                </tbody>

                                </Table>
                            </div> :
                            <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "15rem", padding: 0, position: "relative" }}>
                                <i className='fas fa-close smallclose' onClick={handleClose} style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                                <p style={{ fontSize: 20 }}>Your Cart is Empty</p>
                            </div>
                    }
                </Menu>
            </Navbar>
        </>
    )
}

export default Header