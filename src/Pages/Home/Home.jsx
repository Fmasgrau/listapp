import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
} from 'react-bootstrap';
import ModalFindings from '../../Components/Modal/ModalFindings'
import ModalView from '../../Components/Modal/ModalView'

import Table from '../../Components/Table/Table';

import jsonFindings from '../../Components/Data/Dummy/ic4pro_findingsTest.json';

const Worksheet = () => {

    const [data, setData] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [rowSelected, setRowSelected] = useState()
    const [mode, setMode] = useState("")
    

    useEffect(() => {
        setData(jsonFindings)
    }, [])


    const createModal = () => {
        setShowForm(true)
        setMode("create")
    }

    const editModal = () => {
        setShowForm(true)
        setMode("edit")
        
    }

    const saveModal = (e) => {
        console.log("saveModaldesdeHome", e)

        let lista = []

        setShowForm(false)
        if(mode === "create"){
        setData([...data, e])
    }
    else{
        
        data.map((res, index) => {
           // console.log("undef",datos)
            if ( res.findingsId === e.findingsId){
                console.log("puso e", e)
                lista.push(e)
            } else{
                lista.push(res)
            }

           
        }
        
        )
        
        setData(lista)
    }
    }

    const viewModal = () => {
        console.log("viewModal", data[rowSelected])
        setMode("view")
        setShowForm(true)

    }

    const deleteModal = (e) => {
        setMode("delete")
        setShowForm(true)
    }

    const deleteRow = (e) => {

        if(e){
         let lista = []
        let datos = data.map((res, index) => {
            if (rowSelected !== index && rowSelected !== null) {
                lista.push(res)
            }
        }
        )

        if (rowSelected !== null) {
            setData(lista)
        }

        setShowForm(false)
    }
        console.log("delete", e)
    }

    const cancelModal = () => {
        setShowForm(false)
    }

    const __onSelect = (e) => {
        setRowSelected(e)
        console.log("select data", e)
    }


    const showModal = () => {
        
        if(mode === "view" || mode === "delete"){
           return( <ModalView 
        data={data && data.length > 0 ? rowSelected >= 0 ? data[`${rowSelected}`] : [] : []}
        entityIdData={data && data.length > 0 ? rowSelected >= 0 ? data[`${rowSelected}`].entityId : [] : []}
        show={showForm}
        cancelModal={cancelModal}
        saveModal={saveModal}
        mode={mode}
        rowSelected={rowSelected}
        deleteModal={deleteRow}
        
        />)
        }
        else if(mode === "create") {
            console.log("select modal",rowSelected)
            return(
                <ModalFindings

                data={[]}
                entityIdData={[]}
                show={showForm}
                cancelModal={cancelModal}
                saveModal={saveModal}
                mode={mode}
                rowSelected={rowSelected}


            />
            )
        }

        else{
            return(<div></div>)
        }

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
                                onClick={createModal}
                            >
                                Create
              </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                className="ml-1"
                                name="edit"
                                onClick={editModal}
                                disabled={rowSelected === undefined ? true : false}

                            >
                                Edit
              </Button>
                            <Button
                                variant="success"
                                size="sm"
                                className="ml-1"
                                name="view"
                                onClick={viewModal}
                                disabled={rowSelected === undefined ? true : false}

                            >
                                View
              </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                className="ml-1"
                                name="delete"
                                onClick={deleteModal}
                                disabled={rowSelected === undefined ? true : false}

                            >
                                Delete
              </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table
                                data={data}
                                onSelect={__onSelect}
                            />
                        </Col>
                    </Row>

                </Card.Body>
            </Card>


           {showModal()}

        </Container>
    )
}

export default Worksheet;