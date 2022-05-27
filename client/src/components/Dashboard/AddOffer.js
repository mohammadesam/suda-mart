import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Badge from "@material-ui/core/Badge";

const AddOffer = ({ offer, id, setOffer }) => {
  const [TextFieldContent, setTextFieldContent] = useState("");
  const [DialogOpen, setDialogOpen] = useState(false);
  const [removeOfferDialog, setRemoveOfferDialog] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const currentText = event.target.value;
    if (!currentText.length) setError("Please enter a valid offer");
    else if (Number(currentText) < 0 || Number(currentText) > 99)
      setError("percentage must be between 0 and 99");
    else {
      setError("");
      setTextFieldContent(event.target.value);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddOffer = (e) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  const handleOfferAddition = async () => {
    if (TextFieldContent === "") setError("Please enter a valid offer");
    if (error) return;

    const response = await fetch("/api/dashboard/offers/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        offer: { available: true, percent: Number(TextFieldContent) },
        id,
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert("offer added successfully");
      setOffer(data.product.offer);
      handleDialogClose();
    } else {
      setError(data.message);
    }
  };

  const handleRemoveOfferDialogOpen = (e) => {
    e.preventDefault();
    setRemoveOfferDialog(true);
  };

  const handleRemoveOffer = async () => {
    console.log("removing offer");
    const response = await fetch("/api/dashboard/offers/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        offer: { available: false, percent: 0 },
        id,
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert("offer deleted successfully");
      setOffer({ available: false, percent: 0 });
      handleDialogClose();
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      {offer && offer.available ? (
        <button onClick={handleRemoveOfferDialogOpen} className="add-offer">
          Remove Offer
        </button>
      ) : (
        <button onClick={handleAddOffer} className="add-offer">
          Add Offer
        </button>
      )}

      {removeOfferDialog ? (
        <ConfirmDialog
          phrase={"Are you sure you want to end this offer?"}
          setDialog={setRemoveOfferDialog}
          dialog={removeOfferDialog}
          deleteHandler={handleRemoveOffer}
        />
      ) : null}
      <Dialog open={DialogOpen}>
        <DialogTitle> Add Offer </DialogTitle>
        <DialogContent>
          <div style={{ color: "red", textAlign: "center", margin: "5px 0" }}>
            {" "}
            {error}{" "}
          </div>
          <label> Enter the percentage </label>
          <TextField type="number" onChange={handleChange}></TextField>
        </DialogContent>
        <DialogActions>
          <button
            style={{
              padding: "3px  8px",
              background: "#354555",
              color: "white",
            }}
            onClick={() => handleOfferAddition(TextFieldContent)}
          >
            Add
          </button>
          <button
            style={{
              padding: "3px  8px",
              background: "#354555",
              color: "white",
            }}
            onClick={handleDialogClose}
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddOffer;
