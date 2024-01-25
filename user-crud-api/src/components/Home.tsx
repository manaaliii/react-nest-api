import React, {useEffect, useState} from 'react';
import CustomTable from "./CustomTable.tsx";
import ViewUser from "./ViewUser.tsx";
import DeleteUser from "./DeleteUser.tsx";
import UserForm from "./UserForm.tsx";
import Service from "../service/service.tsx";
import {useNavigate} from "react-router-dom";

const Home:React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<null | object[]>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [successFull, setSuccessFull] = useState(false);
    const [data, setData] = useState(null);
    const [id, setId] = useState(null);
    const [bool, setBool] = useState(false);

    const handleSuccess = () => setSuccessFull(!successFull);

    const handleViewClose = () =>{
        setIsViewOpen(false);
        setData(null);
    }

    const handleFormClose = () =>{
        setIsFormOpen(false);setId(id);
        setData(null);
        setId(null);
    }

    const handleDeleteClose = () =>{
        setIsDeleteOpen(false);
        setId(null);
    }

    const handleView = async(id:number)=>{
        try{
            const response = await Service.makeAPICall({
                methodName: Service.postMethod,
                api_url: Service.user,
                params: id
            });
            const user = await response.data;
            console.log(response);
            setData(user);
            setIsViewOpen(true);
        }catch (error){
            console.log(error);
        }
    }

    const handleDelete = (id:number)=>{
        setId(id);
        setIsDeleteOpen(true);
    }

    const handleUpdate = (id:number)=>{
        setId(id);
        setData(users.find(user=>user.id === id));
        navigate(`/update/${id}`);
        setIsFormOpen(true);
    }
    const handleAdd = () => {
        setIsFormOpen(true);
        navigate('/adduser')
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'View',
            key: 'view',
            render: (text, record)=>(
                <button className='btn btn-primary' onClick={()=>handleView(record.id)}>
                    View
                </button>
            )
        },
        {
          title: 'Update',
          key: 'update',
          render: (text, record)=>(
              <button className='btn btn-dark' onClick={()=>handleUpdate(record.id)}>
                  Update
              </button>
          )
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record)=> (
                <button className='btn btn-danger' onClick={()=>handleDelete(record.id)}>
                    Delete
                </button>
            )
        }
    ]

    useEffect(()=>{
     const fetchData = async () =>{
         setBool(true)
         try{
             const response = await Service.makeAPICall({
                 methodName: Service.getMethod,
                 api_url: Service.user,
             });
             const data = await response.data;

             console.log(data)
             setUsers(data);
             setBool(false)
         }catch(err){
             console.log(err)
         }
     }
     fetchData();
    }, [successFull])

    return(
        <>{users?.length>0 ?
            <>
                <h2>User App</h2>
                <hr />
                <button type="button" className='btn btn-secondary' onClick={()=>handleAdd()}>Add User</button>
                <hr />
                {isFormOpen && id === null && <UserForm method={'POST'} closeModal={handleFormClose} handleSuccess={handleSuccess}/>}
                {isFormOpen && id !== null && <UserForm method={'PATCH'} closeModal={handleFormClose} data={data} id={id} handleSuccess={handleSuccess}/>}
                <CustomTable dataSource={users} columns={columns} />
                {isViewOpen && <ViewUser data={data} closeModal={handleViewClose} />}
                {isDeleteOpen && <DeleteUser handleSuccess={handleSuccess} id={id} closeModal={handleDeleteClose} />}
            </>
            :
            "Loading..."
        }
           </>
    )
}

export default Home;