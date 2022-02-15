import axios from 'axios';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const initialState = {
    title: '',
    date: '',
    duration: '',
    type: ''

};


const AddEditTask = () => {

    const [state, setState] = useState(initialState);

    const { title, date, duration, type } = state;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !date || !duration || !type) {
            toast.error("Please provide the value of input")
        } else {
            axios.post('http://localhost:8080/postTask', {
                title,
                date,
                duration,
                type
            })
                .then(() => {
                    setState({ title: "", date: "", duration: "", type: "" })
                })
                .catch((err) => { toast.error(err.response.data) });
            toast.success("Task added successfully");
            setTimeout(() => navigate('/'), 500)
        }
    }

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({...state, [name]: value})
    }

    
    return (
        <div>
            <Container>
                <form action="" className='m-auto' onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" placeholder="Title" value={title} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="title">Date</label>
                        <input type="date" id="date" name="date" onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="title">Duration</label>
                        <input type="number" id="duration" name="duration" placeholder="duration" value={duration} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="title">Type</label>
                        <input type="text" id="type" name="type" placeholder="Type" value={type} onChange={handleChange} />
                    </div>

                    <input type="submit" value="Save" />
                    <Link to="/">
                        <input type="button" value="Go Back" />
                    </Link>
                </form>

            </Container>
        </div>
    );
};

export default AddEditTask;