import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
} from 'react-bootstrap';
import ModalFindings from '../../Components/Modal/ModalFindings'

// Components
//import Form from '../../components/Worksheet/Form';
import Table from '../../Components/Table/Table';

import jsonFindings from '../../Components/Data/Dummy/ic4pro_findingsTest.json';

const Worksheet = () => {
    const [state, setState] = useState({
        data: [...jsonFindings],
        showForm: false,
        selectedData: null,
        mode: null
    });

    const [data, setData] = useState(jsonFindings)
    const [showForm, setShowForm] = useState(false)


    const cancelModal = () =>{
        setShowForm(false)
    }

    return (
        <Container fluid className="p-4" style={{ backgroundColor: '#F2F2F2' }}>
            <Card>
                <Card.Body>
                    <Row>
                        <Col className="d-flex flex-row align-items-center">
                            <h2>Findings</h2>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Button
                                variant="info"
                                size="sm"
                                name="create"
                                onClick={() => setShowForm(true)}
                            >
                                Create
              </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                className="ml-1"
                                name="edit"
                            //disabled={!state.selectedData}

                            >
                                Edit
              </Button>
                            <Button
                                variant="success"
                                size="sm"
                                className="ml-1"
                                name="view"
                            //disabled={!state.selectedData}

                            >
                                View
              </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                className="ml-1"
                                name="delete"
                            //disabled={!state.selectedData}

                            >
                                Delete
              </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table
                                data={data}
                                
                            />
                        </Col>
                    </Row>

                </Card.Body>
            </Card>

            <ModalFindings

                data={data}
                show={showForm}
                cancelModal={cancelModal}


            //selectedData={state.selectedData}
            />


            {/* <Form
        show={state.showForm}
        handleForm={handleForm}
        submitForm={submitForm}
        mode={state.mode}
        selectedData={state.selectedData}
        deleteData={deleteData}
      /> */}
        </Container>
    )
}

export default Worksheet;