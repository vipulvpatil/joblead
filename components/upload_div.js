import {Button, Stack, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import UploadIcon from "@mui/icons-material/Upload"
import styles from "@/styles/Home.module.css"

const UploadDiv = ({onChange, apiError, uploadStatus}) => {
  const [statusJsx, setStatusJsx] = useState(null)

  useEffect(() => {
    if(uploadStatus === "pending"){
      setStatusJsx(<Typography variant="body2" className={styles.error}>pending</Typography>)
    } else {
      if(uploadStatus === "complete"){
        if(apiError){
          setStatusJsx(<Typography variant="body2" className={styles.error}>{apiError}</Typography>)
        } else {
          setStatusJsx(<Typography variant="body2" className={styles.error}>complete</Typography>)
        }
      }
    }
  }, [apiError, uploadStatus])
  

  return (
    <Stack direction="column" className={styles.uploadFileStack} spacing={2}>
      <Typography variant="body2">Begin by uploading your resume.</Typography>
      <Button component="label" variant="contained" disabled={uploadStatus === "pending"} startIcon={<UploadIcon />} sx={{p:"auto"}}>
        Upload
        <input
          type="file"
          accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          hidden 
          onChange={onChange}
        />
      </Button>
      {statusJsx}
    </Stack>
  )
}

export default UploadDiv
