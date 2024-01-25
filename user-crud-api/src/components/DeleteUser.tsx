import React from "react";
import Service from "../service/service.tsx";

const DeleteUser: React.FC = ({closeModal, handleSuccess,id}) => {
    const handleDelete = async () =>{
        try{
            const response = await Service.makeAPICall({
                methodName: Service.deleteMethod,
                api_url: Service.user,
                params: id,
            })
            console.log(response)
            if(response.status === 200){
                handleSuccess();
            }
        }catch(err){
            console.log(err);
        }
        closeModal();
    }
    return (
        <>
            <div className="modal fade show blur-background-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Are you sure you want to delete
                                record?</h5>
                        </div>
                        <div className='container-fluid'>
                            <button className="btn btn-danger mx-2 my-2 mr-2" onClick={handleDelete}>Yes</button>
                            <button className="btn btn-secondary my-2" onClick={closeModal}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteUser;