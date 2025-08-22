import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext'; 

function Home() {
    const { loggedInUser, logout } = useContext(AuthContext); 
    const [products, setProducts] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "https://auth-mern-app-backend-23sv.onrender.com/products";
            const token = localStorage.getItem('token');
            const headers = {
                headers: {
                    'Authorization': token
                }
            };
            const response = await fetch(url, headers);
            const result = await response.json();
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {
                    products && products?.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                }
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;