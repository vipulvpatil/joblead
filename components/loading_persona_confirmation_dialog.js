import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material"

const LoadingPersonaConfirmationDialog = ({open, handleContinue, handleSkip}) => {
  return (
    <Dialog
        open={open}
        aria-labelledby="confirm-city-dialog-title"
        aria-describedby="confirm-city-dialog-description"
      >
      <DialogTitle id="confirm-city-dialog-title" typography={"h4"} sx={{textAlign: "center"}}>
        Loading persona from local storage
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-city-dialog-description" sx={{textAlign: "center"}}>
          We found a previously built persona in your local storage.<br/>Would like to load it now?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleContinue} variant="contained">
          Yes
        </Button>
        <Button onClick={handleSkip} variant="contained">
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoadingPersonaConfirmationDialog
