import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material"

const CityConfirmationDialog = ({open, selectedCity, setSelectedCity, handleClose}) => {
  const handleCityChanged = (e) => {
    setSelectedCity(e.target.value)
  }
  
  return (
    <Dialog
        open={open}
        aria-labelledby="confirm-city-dialog-title"
        aria-describedby="confirm-city-dialog-description"
      >
      <DialogTitle id="confirm-city-dialog-title" typography={"h4"} sx={{textAlign: "center"}}>
        Confirm city for job search
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-city-dialog-description">
          <TextField 
            id="confirm-city-text-field" 
            label="City"
            variant="outlined"
            defaultValue={selectedCity}
            helperText="Please confirm or update as per your preference"
            sx={{m:"0.5rem"}}
            color="secondary"
            onChange={handleCityChanged}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus variant="contained">
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CityConfirmationDialog
