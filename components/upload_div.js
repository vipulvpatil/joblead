import {Button, Stack, Typography} from "@mui/material"
import UploadIcon from "@mui/icons-material/Upload"
import styles from "@/styles/Home.module.css"
import {useState} from "react"

const UploadDiv = () => {
  const [apiError, setApiError] = useState("")

  const onChange = (event) => {
    if (!event.target.files?.length) {
      return
    }
    uploadResume(event.target.files[0])
  }

  const uploadResume = async(resumeFile) => {
    const formData = new FormData()
    formData.append("resume", resumeFile)

    const config = {
      headers: {"content-type": "multipart/form-data"},
      onUploadProgress: (event) => {
        console.log("Current progress:", Math.round((event.loaded * 100) / event.total))
      },
    }

    const response = await fetch("/api/process_resume", {
      method: "POST",
      body: formData,
    }, config)
    const responseJson = await response.json()
    setApiError(responseJson["error"])
  }

  return (
    <Stack direction="column" className={styles.uploadFileStack} spacing={2}>
      <Typography variant="body2">Begin by uploading your resume.</Typography>
      <Button component="label" variant="contained" startIcon={<UploadIcon />} sx={{p:"auto"}}>
        Upload
        <input
          type="file"
          accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          hidden 
          onChange={onChange}
        />
      </Button>
      <Typography variant="body2" className={styles.error}>{apiError}</Typography>
    </Stack>
  )
}

export default UploadDiv
