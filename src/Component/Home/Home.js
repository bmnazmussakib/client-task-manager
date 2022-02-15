import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:8080/api/get');
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, [])


    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            axios.delete(`http://localhost:8080/api/remove/${id}`);
            toast.success("Task Deleted successfully");
            setTimeout(() => loadData(), 500);
        }
    }

    

    const handleCheckGetTask = (id) => {
        // const myCheck = document.getElementById(id);
        // const status = document.getElementById('status');
        // const title = document.getElementById('title');

        // if (myCheck.checked == true) {
        //     console.log(data[0].id);
        // } 

        const newTodo = data.map(todo => {
            if (todo.id === id) {
                return { ...todo, done: !todo.done}
            } else {
                return todo;
            }
        })

        setData(newTodo);
        console.log(newTodo);
    }

    // console.log(data);

    return (
        <div>
            <Container>
                <Link to="/addTask">
                    <button className="btn btn-info text-white">Add New Task</button>
                </Link>
                <table className="table table-hover">
                    <thead>
                        <tr className="" >
                            <th scope="col">No.</th>
                            <th scope="col">Done</th>
                            <th scope="col">Title</th>
                            <th scope="col">Date</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Type</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data.map((task, index) => {
                                return (
                                    <tr key={task.id}>
                                        <td>{index + 1}</td>
                                        <th scope="row">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id={task.id} onChange={() => handleCheckGetTask(task.id)}/>
                                            </div>
                                        </th>
                                        <td style={task.done?{color: '#898989', textDecoration: 'line-through'}:{color: 'red'}} id='title'>{task.title}</td>
                                        <td>{task.date}</td>
                                        <td>{task.duration}</td>
                                        <td>{task.type}</td>
                                        <td id="status">{ task.done?"Completed":"Due" }</td>

                                        <td>
                                            <Link to={`/update/${task.id}`}>
                                                <Button className="btn btn-warning">Update</Button>
                                            </Link>

                                            <Button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </Container>
        </div>
    );
};

export default Home;