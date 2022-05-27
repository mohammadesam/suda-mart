import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
function ConfirmDialog({ deleteHandler, phrase, dialog, setDialog }) {
  let handleDialogClose = () => {
    setDialog(false);
  };
  let handleDialogApprove = () => {
    deleteHandler(dialog);
    setDialog(false);
  };
  return (
    <Dialog open={dialog} style={{ padding: 20 }} onClose={handleDialogClose}>
      <DialogTitle>{phrase}</DialogTitle>
      <DialogActions>
        <Button
          style={{
            background: "#354555",
            width: 50,
            color: "white",
          }}
          onClick={handleDialogApprove}
        >
          {" "}
          Delete{" "}
        </Button>
        <Button
          style={{
            border: "solid 1px #354555",
            width: 50,
            color: " #354555",
          }}
          onClick={handleDialogClose}
        >
          {" "}
          Cancel{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
