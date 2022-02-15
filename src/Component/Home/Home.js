import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Home.css';

// MUI DataGrid
import { DataGrid } from '@mui/x-data-grid';






const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async (date = 'empty') => {
        const response = await axios.get(`http://localhost:8080/api/get-home/${date}`);
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


    // Checkbox function
    const handleCheckGetTask = (id) => {

        const newTodo = data.map(todo => {
            if (todo.id === id) {
                return { ...todo, done: !todo.done }
            } else {
                return todo;
            }
        })

        setData(newTodo);
        console.log(newTodo);
    }

    // console.log(data);



    const filterData = () => {
        var date = document.getElementById('date').value;
        setTimeout(() => loadData(`'${date}'`), 500);
    }

    return (
        <div>
            <Container>
                <h1 className="text-center my-5 app-name" style={{ color: '#3498db' }}>TASK MANAGER APP</h1>
                <div className="d-grid gap-2 col-2 mx-auto">
                    <Link to="/addTask">
                        <button className="btn text-white mx-auto btn-add" >ADD NEW TASK</button>
                    </Link>

                </div>
                <div style={{ marginTop: "50px" }}>

                    <table className="table table-hover styled-table">
                        <thead className="" >
                            <tr className="" >
                                <th scope="col" className="text-center" >NO.</th>
                                <th scope="col" className="text-center">DONE</th>
                                <th scope="col" className="text-center">TITLE</th>
                                <th scope="col" className="text-center">

                                    <div className="d-flex justify-content-around">
                                        <div className="mt-5 mx-5">DATE</div>
                                        <input  className="mt-3" type="date" name="date" id="date" onChange={filterData} />

                                    </div>
                                </th>
                                <th scope="col" className="text-center">DURATION</th>
                                <th scope="col" className="text-center">TYPE</th>
                                <th scope="col" className="text-center">STATUS</th>
                                <th scope="col" className="text-center">ACTION</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data.map((task, index) => {

                                    return (
                                        <tr key={task.id}>
                                            <td>{index + 1}</td>
                                            <td scope="row">
                                                <div className="form-check round">
                                                    <input className="form-check-input" type="checkbox" value="" id={task.id} onChange={() => handleCheckGetTask(task.id)} />
                                                </div>
                                            </td>
                                            <td className="text-center" style={task.done ? { color: '#898989', textDecoration: 'line-through' } : { color: 'red' }} id='title'>{task.title}</td>
                                            <td className="text-center">{new Intl.DateTimeFormat('en-GB', { month: '2-digit', day: '2-digit', year: 'numeric', }).format(new Date(task.date))}</td>
                                            <td className="text-center">{task.duration} min</td>
                                            <td className="text-center">{task.type}</td>
                                            <td id="status" className="text-center">{task.done ? "Completed" : "Due"}</td>

                                            <td>
                                                <Link to={`/update/${task.id}`}>
                                                    <Button className="btn btn-edit btn-sm">UPDATE</Button>
                                                </Link>

                                                <Button className="btn btn-delete btn-sm" onClick={() => handleDelete(task.id)}>DELETE</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>

            </Container>
        </div>
    );
};

export default Home;