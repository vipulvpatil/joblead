import {Button, Stack, Typography} from "@mui/material"
import UploadIcon from "@mui/icons-material/Upload"
import styles from "@/styles/Home.module.css"

const UploadDiv = () => {
  return (
    <div className={styles.uploadDiv}>
    <Stack direction="column" className={styles.uploadFileStack} spacing={2}>
      <Typography>Begin by uploading your resume.</Typography>
      <Button variant="contained" startIcon={<UploadIcon />} sx={{p:"auto"}}>
        Upload
      </Button>
    </Stack>
    </div>
  )
}

export default UploadDiv
