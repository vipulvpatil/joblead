import {Card, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"


const Jobcard = ({jobTitle, companyName, jobDescription}) => {
  return (
    <Card variant="outlined" className={styles.card}>
      <Typography>{jobTitle}</Typography>
      <Typography>{companyName}</Typography>
      <Typography>{jobDescription}</Typography>
    </Card>
  )
}

export default Jobcard
