import React from 'react';

const ViewUser: React.FC = ({data, closeModal}) => {
    return (
        <>
            <div className="modal fade show blur-background-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{display: 'block'}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">User is {data.name}</h5>
                            <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className='container-fluid'>
                            <h5 className='bottom-border'>ID: {data.id} </h5>
                            <h5 className='bottom-border'>email: {data.email}</h5>
                            <h5 className='bottom-border'>age: {data.age}</h5>
                            <button className="btn btn-primary my-2" onClick={closeModal}>close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default ViewUser;
