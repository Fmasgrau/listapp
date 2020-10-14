import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Color from '../Color/Color'
import riskA from '../Data/Dummy/ic4pro_RiskAssessment.json'
import riskCol from '../Data/Dummy/ic4pro_statusColors.json'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

const Table = ({ data, selectedData, selectData }) => {


  const [show, setShow] = useState(false);
  const [row, setRow] = useState();
  const [info, setInfo] = useState();
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setRow(e)
  }

  useEffect(() => {
    setInfo(data)
  }, [data])


  const columns = [
    {
      dataField: 'findingsId',
      text: 'Findings ID'

    },
    {
      dataField: 'entityId',
      text: 'Entity ID',
    },

    {
      dataField: 'finalriskrating',
      text: 'Final Risk rating',

      formatter: cell => (<div className="mt-2"><span
        key={`${cell}`}
        style={{ padding: '5px', borderRadius: '10%', background: `#${Color(cell, riskA, riskCol).color}`, color: `${Color(cell, riskA, riskCol).fontColor}` }}

      >{cell}</span></div>)
    },
    {
      dataField: 'grandremarks',
      text: 'Grand Remarks',


    },

    {
      dataField: 'analyticalfindings',
      text: 'Action',
      formatter: (array, event, row, d) => (<>

        <Button variant="primary" size="sm" onClick={() => handleShow(row)}>
          Analytical Findings
        </Button>


      </>)


      // formatter: cell => cell.map((e,index) => <div className="mt-1"><span 
      // key={`${e.riskclassification}`}
      // style={{ padding: '2px', borderRadius: '5%', background: `#${Color(e.findingsrating, riskA, riskCol).color}`, color: `${Color(e.findingsrating, riskA, riskCol).fontColor}`}}

      // >{`${e.riskClassification} - ${e.findingsrating}`}</span></div>)
    }
  ];

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    // hideSelectColumn: !selectedData,
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log(rowIndex, e)
      //setShow(true)
    }
  };

  return (<>
    <BootstrapTable
      bootstrap4
      keyField='findingsId'
      data={data}
      columns={columns}
      striped
      hover
      bordered={false}
      wrapperClasses="table-responsive"
      selectRow={selectRow}
      pagination={paginationFactory({
        showTotal: true,
      })}
    />
    <Modal 
    show={show}
    backdrop="static"
    keyboard={false}
    size="lg"
    dialogClassName=""
    >
      <Modal.Header >
        <Modal.Title>Analytical Findings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Risk Classification</th>
              <th scope="col">Frequency</th>
              <th scope="col">Total Scoring</th>
              <th scope="col">Findings Rating</th>
              <th scope="col">Findings Remarks</th>
            </tr>
          </thead>
          <tbody>

            {data ? data[row] ? data[row].analyticalfindings.map(res => {
              return (<tr>
                <td>{res.riskClassification}</td>
                <td>{res.frequency}</td>
                <td>{res.totalscoring}</td>
                <td><span style={{ padding: '5px', borderRadius: '10%', background: `#${Color(res.findingsrating, riskA, riskCol).color}`, color: `${Color(res.findingsrating, riskA, riskCol).fontColor}` }}>{res.findingsrating}</span></td>
                <td>{res.findingsRemarks}</td>
              </tr>)
            }) : "" : console.log(row)}


          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(row)}>
          Close
            </Button>
        
      </Modal.Footer>
    </Modal>
  </>
  );
}

export default Table;