import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import Service from "../service/service.tsx";

const UserForm: React.FC = ({method}) => {
    const textDisplay = method === 'POST' ? 'Add' : 'Update';
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        age: '0',
    });
    const {id} = useParams();
    const navigate = useNavigate();
    const fetchData = async(id:number) => {
        try{
            const response = await Service.makeAPICall({
                methodName: Service.postMethod,
                api_url: Service.user,
                params: id
            })

            let user = await response.data;
            // console.log(user)
            setData(user);

        }catch (error){
            console.log(error);
        }

    }

    useEffect(()=>{
        if(id){
            fetchData(parseInt(id));
        }
    }, [id])

    const handleChange = (event) =>{
            const {name, value} = event.target;
            console.log(name)
            setData(prevData => ({...prevData,[name]:value}))
    }


    const handleNavigateBack = () =>{
        navigate('/')
    }

    const handleAddUser = async () => {
        let Age = parseInt(data.age);

        const newUser = {
            "name": data.name,
            "email": data.email,
            "password": data.password,
            "age": Age
        }
        console.log(Age)

        if(data.name === '' || data.name.length < 3 || data.name.length > 30) {
            alert('Name must be at least 3 characters and at most 30 characters');
            return null;
        }
        if(Age < 0 || Age > 100) {

            alert('Age must be at least 1 and at most 100');
            return null;
        }
        const method_name = method === 'POST' ? Service.postMethod : Service.putMethod;
        try{
            const response = await Service.makeAPICall({
                methodName: method_name,
                api_url: Service.user,
                params: [id],
                body: newUser
            })
        }catch (error){
            console.log(error)
        }
        navigate('/')

    }

    return (
        // <>lmado dead</>

<>
    <h4>{textDisplay} User</h4>
    <form className='mx-auto my-2'
          style={{width: '60%', border: '1px solid gray', padding: '0.5em 0.5em'}}>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" value={data.name } name="name" className="form-control"
                   onChange={(event) => handleChange(event)} id="name"
                   placeholder="Name" required/>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" value={data.email } name="email" className="form-control"
                   onChange={(event) => handleChange(event)} id="email"
                   placeholder="Email" required/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" value={data.password } name="password" className="form-control"
                   onChange={(event) => handleChange(event)} id="password"
                   placeholder="Password" required/>
        </div>
        <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" value={data.age} min={1} max={100} name="age" className="form-control"
                   onChange={(event) => handleChange(event)} id="age"
                   placeholder="Age" required/>
        </div>

    </form>
    <button type="button" className="btn btn-primary" onClick={handleAddUser}>
        {textDisplay} User
    </button>
    <button type="button" className="btn btn-danger mx-2" onClick={handleNavigateBack}>
        Cancel
    </button>
</>

    );
}


export default UserForm;