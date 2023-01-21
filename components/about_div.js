import {Button, CircularProgress, Stack, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import SearchIcon from "@mui/icons-material/Search"
import styles from "@/styles/Home.module.css"

const AboutDiv = ({onClick, apiError, apiStatus}) => {
  const [statusJsx, setStatusJsx] = useState(null)

  useEffect(() => {
    if(apiStatus === "pending"){
      setStatusJsx(<Typography variant="body2" className={styles.error}>searching<CircularProgress size={18} className={styles.resumeProgress}/></Typography>)
    } else {
      if(apiStatus === "complete"){
        if(apiError){
          setStatusJsx(<Typography variant="body2" className={styles.error}>{apiError}</Typography>)
        } else {
          setStatusJsx(<Typography variant="body2" className={styles.error}>data is ready</Typography>)
        }
      }
    }
  }, [apiError, apiStatus])
  
  return (
    <Stack direction="column" className={styles.uploadFileStack} spacing={2}>
      <Typography variant="body2">
        This is an experiment in AI based job hunt. All you have to do is provide your resume in DOCX or PDF format and we will find the best matching jobs after analysing your resume using OpenAI&apos;s GPT-3
      </Typography>
      <Button 
        component="label" 
        variant="contained" 
        disabled={apiStatus === "pending"} 
        startIcon={<SearchIcon />} 
        sx={{p:"auto"}}
        onClick={onClick}>
        Search
      </Button>
      {statusJsx}
    </Stack>
  )
}

export default AboutDiv
