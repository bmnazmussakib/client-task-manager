import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get('http://localhost:8080/allTask');
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, [])


    return (
        <div>
            <Container>
                <table className="table table-hover">
                    <thead>
                        <tr className="" >
                            <th scope="col">Done</th>
                            <th scope="col">Title</th>
                            <th scope="col">Due</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Type</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data.map((task, index) => {
                                return (
                                    <tr key={task.id}>
                                        <td>{index + 1}</td>
                                        <td>{task.title}</td>
                                        <td>{task.date}</td>
                                        <td>{task.duration}</td>
                                        <td>{task.type}</td>
                                        <td>
                                            <Link to={`/update/${task.id}`}>
                                                <Button className="btn btn-warning">Update</Button>
                                            </Link>

                                            <Button className="btn btn-danger">Delete</Button>
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