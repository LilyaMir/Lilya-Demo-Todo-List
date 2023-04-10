import {Modal, Button} from "react-bootstrap";

function ConfirmDialog(props){
    return(
        <Modal
        size="sm"
        show={true}
        onHide={() => {
          console.log('closed')
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure to delete the selected tasks?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <div className="d-flex justify-content-evenly">
        <Button variant='danger'>Delete</Button>
        <Button variant='success'>Cancel</Button>
        </div>
        </Modal.Body>
      </Modal>
    );
}

export default ConfirmDialog;
