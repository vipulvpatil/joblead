import {Button, Stack, Typography} from "@mui/material"
import UploadIcon from "@mui/icons-material/Upload"
import styles from "@/styles/Home.module.css"

const UploadDiv = ({onChange, apiError}) => {
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
