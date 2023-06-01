import React, { useEffect, useState } from 'react'
import { Button,Row,Col, Form,FormGroup,InputGroup,InputGroupAddon,InputGroupText } from 'reactstrap'
import moment from 'moment'
import { fetchAllWorkforces } from '../../api'
import CDropdown from '../../components/Dropdown/cdropdown'
import ReactDatetime from 'react-datetime'
import CustomInput from "../../components/Form/Input.js"


const SendInvoice = ({toggleModal,submit}) => {


    const [invData,setInvData] = useState({
        action: 3,
        template: {
            title: "",
            id: ""
        }
    })



    const handleSubmit = (e) => {
      e.preventDefault()
      submit(invData)

    }


    return(
        <Form onSubmit={handleSubmit} autoComplete="off">
                  <h6 className="heading-small text-muted mb-4">
                    Send Invoice
                  </h6>
                  <div className="container">
                    <Row>
                      <p>This action allows you to send Invoice details to client</p >
                    </Row>
                  </div>
                 
                  <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={toggleModal}
              >
                Close
              </Button>
              <Button color="primary" type="submit">
                Add Action
              </Button>
            </div>
                </Form>
    )
}

export default SendInvoice