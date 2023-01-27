import {Button, CircularProgress, Stack, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import UploadIcon from "@mui/icons-material/Upload"
import styles from "@/styles/Home.module.css"

const UploadDiv = ({onChange, personaBuilderMessage, personaBuilderStatus}) => {
  const [statusJsx, setStatusJsx] = useState(null)

  useEffect(() => {
    if(personaBuilderStatus === "pending"){
      setStatusJsx(<Typography variant="body2" className={styles.error}>analysing resume<CircularProgress size={18} className={styles.resumeProgress}/></Typography>)
    } else {
      if(personaBuilderStatus === "complete"){
        const message = personaBuilderMessage || "persona created from resume"
        setStatusJsx(<Typography variant="body2" className={styles.error}>{message}</Typography>)
      }
    }
  }, [personaBuilderMessage, personaBuilderStatus])
  

  return (
    <Stack direction="column" className={styles.uploadFileStack} spacing={2}>
      <Typography variant="body2">Begin by uploading your resume.</Typography>
      <Button component="label" variant="contained" disabled={personaBuilderStatus === "pending"} startIcon={<UploadIcon />} sx={{p:"auto"}}>
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
