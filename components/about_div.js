import {Stack, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const AboutDiv = () => {
  return (
    <Stack direction="column" className={styles.aboutStack} spacing={2}>
      <Typography variant="body2">
        This is an experiment in AI based job hunt. All you have to do is provide your resume in DOCX or PDF format and we will find the best matching jobs after analysing your resume using OpenAI&apos;s GPT-3
      </Typography>
    </Stack>
  )
}

export default AboutDiv
