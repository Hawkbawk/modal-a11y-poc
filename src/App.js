import { useState } from "react";
import { CloseButton, Modal, TextInput } from "@instructure/ui";
import { Button } from "@instructure/ui";
import { Alert } from "@instructure/ui";
// Included for PoC purposes.
import { showFlashError, showFlashSuccess } from "./FlashAlert";

function App() {
  const [open, setOpen] = useState(false);
  const [failure, setFailure] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const renderAlert = () => {
    if (!showAlert) {
      return;
    }

    return (
      <Alert
        variant={failure ? "error" : "success"}
        timeout={5000}
        onDismiss={() => setShowAlert(false)}
        margin="small"
        renderCloseButtonLabel="Close"
      >
        {failure
          ? "Couldn't submit the form"
          : "Successfully submitted the form"}
      </Alert>
    );

    // It's common inside of Canvas to use the showFlashAlert package so that your
    // alerts are rendered at the top of the page, rather than nested inside whatever
    // your current parent element is. I've copied over the showFlash* code from
    // Canvas. If you want to test it here, you can comment out the above return
    // line and then uncomment out these next two lines. You'll see the alerts
    // rendered twice (as React rerenders due to changing showAlert), but the issue
    // of alerts not getting read out still stands. In addition, moving this code
    // inside the "onClose" prop of the modal still has the same issue, although
    // I think this methodology of a "renderAlert" method is a little more React-y.
    // setShowAlert(false)
    // failure ? showFlashError("Couldn't submit the form")() : showFlashSuccess("Successfully submitted the form")
  };

  return (
    <div style={{ padding: "0 0 11rem 0", margin: "0 auto" }}>
      {renderAlert()}
      <Button onClick={() => setOpen(true)}>Open the modal</Button>
      <Modal
        open={open}
        onDismiss={() => {
          setOpen(false);
          setShowAlert(false);
        }}
        onSubmit={handleFormSubmit}
        size="auto"
        shouldCloseOnDocumentClick
        label="Test Modal"
      >
        <Modal.Header>
          <CloseButton
            placement="end"
            offset="small"
            onClick={() => setOpen(!open)}
            screenReaderLabel="Close"
          />
        </Modal.Header>
        <Modal.Body>
          <TextInput
            renderLabel="Example Input"
            placeholder="Lorem ipsum dolor..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen(!open)} margin="0 x-small 0 0">
            Close
          </Button>
          <Button
            onClick={() => {
              setOpen(!open);
              setFailure(false);
              setShowAlert(true);
            }}
            color="primary"
            margin="x-small"
          >
            Submit Successfully
          </Button>
          <Button
            onClick={() => {
              setOpen(!open);
              setFailure(true);
              setShowAlert(true);
            }}
            type
            color="danger"
            margin="x-small"
          >
            Submit Unsuccessfully
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
