import React,{useState,useEffect} from "react";
import TextEditor from '../../../components/Form/TextEditor'
import empty from "../../../images/empty.png"


import {
  
  Card,
  CardHeader,
  
  Table,
  Container,
  Row,
  
  Modal,
  Form,
  Col,
  Button
} from "reactstrap";


import UserHeader from "../../../components/Headers/UserHeader";
import CustomPagination from "../pagination.js"
import CustomInput from "../../../components/Form/Input.js"
import { useDispatch,useSelector } from "react-redux";

import TemplateList from "./list.js";

import { fetchTemplate, updateTemplate,createTemplate} from "../../../actions/emailTemplate.js";
import  EditorToolbar, {formats,modules } from "./EmailToolbar";
import ReactQuill, {Quill} from "react-quill";
import 'react-quill/dist/quill.snow.css';
import '../quill.css'
import { fetchVariable } from "../../../actions/loading";
import { useHistory } from "react-router-dom";

// const CustomHeart = () => <span>♥</span>;

// function insertHeart() {
//   const cursorPosition = this.quill.getSelection().index;
//   this.quill.insertText(cursorPosition, "♥");
//   this.quill.setSelection(cursorPosition + 1);
// }


// const addVariable = e => {
//   console.log("tooo")
//   console.log(e.value)
//   const cursorPosition = this.quill.getSelection().index;
//   this.quill.insertText(cursorPosition, e.target.value);
//   this.quill.setSelection(cursorPosition + 1);
// }

// const CustomToolbar = () => (
//   <div id="toolbar">
//     <select className="ql-font">
//       <option value="arial" selected>
//         Arial
//       </option>
//       <option value="comic-sans">Comic Sans</option>
//       <option value="courier-new">Courier New</option>
//       <option value="georgia">Georgia</option>
//       <option value="helvetica">Helvetica</option>
//       <option value="lucida">Lucida</option>
//     </select>
//     <select className="ql-size">
//       <option value="extra-small">Size 1</option>
//       <option value="small">Size 2</option>
//       <option value="medium" selected>
//         Size 3
//       </option>
//       <option value="large">Size 4</option>
//     </select>
//     <select className="ql-align" />
//     <select className="ql-color" />
//     <select className="ql-background" />
//     <button className="ql-clean" />
//     <select className="ql-header" onChange={addVariable}>
//       <option value="%company_name%">Company Name</option>
//       <option value="%client_name%">Client Name</option>
//       <option value="%event_type%">Event Type</option>
//       <option value="%event_location%">Event Location</option>
//       <option value="%event_date%">Event Date</option>
//       <option value="%quoted_amount%">Quoted Amount</option>
//     </select>
//   </div>
// );

// const Size = Quill.import("formats/size");
// Size.whitelist = ["extra-small", "small", "medium", "large"];
// Quill.register(Size, true);

// // Add fonts to whitelist and register them
// const Font = Quill.import("formats/font");
// Font.whitelist = [
//   "arial",
//   "comic-sans",
//   "courier-new",
//   "georgia",
//   "helvetica",
//   "lucida"
// ];
// Quill.register(Font, true);


// const CustomButton = () => {

//   var customVariable = useSelector((state) => state.variable)

//   let dispatch = useDispatch()

//   const handleSelect = (e) => {
//     console.log("im called")
//     dispatch(fetchVariable(e.target.value))
//     console.log(customVariable)
//   }
  

//   return(
//     <select className="ql-q" value={customVariable} onChange={e => handleSelect(e)}>
//       {/* <option value="" disabled selected>Variable</option> */}
//       <option value="%company_name%">Company Name</option>
//       <option value="%client_name%">Client Name</option>
//       <option value="%event_type%">Event Type</option>
//       <option value="%event_location%">Event Location</option>
//       <option value="%event_date%">Event Date</option>
//       <option value="%quoted_amount%">Quoted Amount</option>
          
//   </select> 
//   )
// }
  
// class Editor extends React.Component {
//   state = { editorHtml: "" };

//   handleChange = html => {
//     this.setState({ editorHtml: html });
//   };

//   static modules = {
//     toolbar: {
//       container: "#toolbar",
//       handlers: {
//         insertHeart: insertHeart
//       }
//     }
//   };

//   static formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "color"
//   ];

//   render() {
//     return (
//       <div className="text-editor">
//         <CustomToolbar />
//         <ReactQuill
//           value={this.state.editorHtml}
//           onChange={this.handleChange}
//           placeholder={this.props.placeholder}
//           modules={Editor.modules}
//           formats={Editor.formats}
//         />
//       </div>
//     );
//   }
// }


const EmailTemplate = () => {
    
    const user = JSON.parse(localStorage.getItem('profile'));
    const [isModal,setIsModal] = useState(false);

  

    const [body, setBody] = useState('')
    const [templateData,setTemplateData] = useState({
        title: "",
        subject: ""
    })


const [currentId,setCurrentId] = useState(null)


  // const toggleModal = () => {
  //   setIsModal((prevIsModal) => !prevIsModal)
  //   clear()
  // }

  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)
  
  const dataSpecific = useSelector((state) => currentId ? state.data.find((p) => p._id === currentId) : null);




  useEffect(()=>{
    dispatch(fetchTemplate())
  },[dispatch])



 

    // useEffect(() => {
    //   if(dataSpecific) {
    //    setTemplateData(dataSpecific);
    //    setBody(dataSpecific.body)
    //   }
    // },[dataSpecific])

    

 

// const clear = () => {
//   setCurrentId(0);
//   setTemplateData({
//     title: "",
//     subject: ""
//   })
//   setBody('')
// }
const history = useHistory()

const createTemplate = () => {
  history.push(`/app/settings/mail-templates/create/`)
}

  const desc = "Create Dynamic Templates for sending customized emails"

  return (
    <>
        <UserHeader name="Email Templates" description={desc} />

      
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                {/* <h3 className="mb-0">Card tables</h3> */}
                <Row className="align-items-center">
                <div className="col">
                    <h3 className="mb-0">Email Templates</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={() => createTemplate()}
                      size="sm"
                    >
                      Template +
                    </Button>
                  </div>
                  </Row>

                
          
          
        

              </CardHeader>
              {!data.length ?  (
                    <div className="text-center d-4">
                      <img src={empty} className="n-icon"/>
                      <p>No Templates Available</p>
                      
                    </div>
                  ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  

                  {!data?.length ? "Loading": (
                    data.map((d) => (
                        
                      <TemplateList  data={d} setCurrentId={setCurrentId} setIsModal = {setIsModal} templatekey={d._id} />
                      
                    ))
                  )}
                  
                </tbody>
              </Table>
                  )}
              <CustomPagination/>
            </Card>
          </div>
        </Row>
        

          {/* <Modal
            className="modal-dialog-centered modal-xl p-0"
            isOpen={isModal}
            toggle={toggleModal}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                EMAIL TEMPLATE
              </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={toggleModal}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
            <Form onSubmit={handleSubmit} autoComplete="off">
                  
                  <div className="">
                    <Row>
                      <CustomInput label="Template Name" 
                            type="text"
                            placeholder="" 
                            idName = "input-title"
                            name="title"
                            onChange = {handleChange}
                            col="12"
                            value={templateData.title}
                            required
                            />

                    
                      
                      
                    </Row>
                    <Row>
                      <CustomInput label="Subject" 
                            type="text"
                            placeholder="Email Subject" 
                            idName = "input-subject"
                            name="subject"
                            onChange = {handleChange}
                            col="12"
                            value={templateData.subject}
                            required
                            />

                    
                      
                      
                    </Row>
                    <Row>
                        <Col lg={12}>
                        <EditorToolbar />
                          <ReactQuill
                            theme="snow"
                            value={body}
                            onChange={handleHTML}
                            placeholder={"Email Body"}
                            modules={modules}
                            formats={formats}
                          />
                        </Col>
                    </Row>
                    
                    <Row>
                      <Col lg={12}>
                        <select>
                          <option value="%company_name%">Company Name</option>
                          <option value="%client_name%">Client Name</option>
                          <option value="%event_type%">Event Type</option>
                          <option value="%event_location%">Event Location</option>
                          <option value="%event_date%">Event Date</option>
                          <option value="%quoted_amount%">Quoted Amount</option>
                          <option value="%company_name%">Company Name</option>
                          <option value="%client_name%">Client Name</option>
                          <option value="%event_type%">Event Type</option>
                          <option value="%event_location%">Event Location</option>
                          <option value="%event_date%">Event Date</option>
                          <option value="%quoted_amount%">Quoted Amount</option>
                        </select>
                      </Col>
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
                Save changes
              </Button>
            </div>
                </Form>
            </div>

            
          </Modal> */}
          

      </Container>
    </>
    )
}

export default EmailTemplate