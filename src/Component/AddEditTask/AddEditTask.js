import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddEditTask.css';


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
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/get/${id}`)
            .then((response) => setState({ ...response.data[0] }))
    }, [id])




    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !date || !duration || !type) {
            toast.error("Please provide the value of input")
        } else {
            if (!id) {
                axios.post('http://localhost:8080/api/post', {
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
            } else {
                axios.put(`http://localhost:8080/api/update/${id}`, {
                    title,
                    date,
                    duration,
                    type
                })
                    .then(() => {
                        setState({ title: "", date: "", duration: "", type: "" })
                    })
                    .catch((err) => { toast.error(err.response.data) });
                toast.success("Task updated successfully");
            }

            setTimeout(() => navigate('/'), 500)
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }


    return (
        <div>
            <Container>
                <div className="w-50 mx-auto my-5">
                    <h1 className="text-center mb-5" style={{color: '#4caf50'}}>{ id? "EDIT": "ADD" } TASK</h1>
                    <form action="" className='m-auto' onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" placeholder="Title" value={title || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="title">Date</label>
                            <input type="date" id="date" name="date" value={date || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="title">Duration</label>
                            <input type="number" id="duration" name="duration" placeholder="duration" value={duration || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="title">Type</label>
                            <input type="text" id="type" name="type" placeholder="Type" value={type || ""} onChange={handleChange} />
                        </div>

                        <input type="submit" value={id ? "Update" : "Save"} />
                        <Link to="/">
                            <input type="button" value="Go Back" />
                        </Link>
                    </form>
                </div>

            </Container>
        </div>
    );
};

export default AddEditTask;