import React from 'react';
import { Container } from 'react-bootstrap';

const UpdateTask = () => {
    return (
        <div>
            <h1>Edit Data</h1>
            {/* <Container>
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

            </Container> */}
        </div>
    );
};

export default UpdateTask;