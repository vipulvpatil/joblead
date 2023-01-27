import {Stack, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const AboutDiv = () => {
  return (
    <Stack direction="column" className={styles.aboutStack} spacing={2}>
      <Typography variant="body2">
        &#8226; This is an experiment in AI based job hunt.
        <div className={styles.spacingDiv}/>
        &#8226; Provide your resume in DOCX or PDF format and we will find the best matching jobs after analysing your resume using OpenAI&apos;s GPT-3.
        <div className={styles.spacingDiv}/>
        &#8226; Note: We do not save any user data on the server.
      </Typography>
    </Stack>
  )
}

export default AboutDiv
