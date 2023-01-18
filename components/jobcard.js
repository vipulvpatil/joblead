import {Card, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"


const Jobcard = ({jobTitle, companyName, jobDescription}) => {
  return (
    <Card variant="outlined" className={styles.card}>
      <Typography variant="h4" noWrap={true}>{jobTitle}</Typography>
      <Typography variant="h5" noWrap={true}>{companyName}</Typography>
      <Typography variant="body" className={`${styles.maxThreeLinesText} ${styles.jobDescription}`}>{jobDescription}</Typography>
    </Card>
  )
}

export default Jobcard
