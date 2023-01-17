import {Card, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"


const Jobcard = ({jobTitle, companyName, jobDescription}) => {
  return (
    <Card variant="outlined" className={styles.card}>
      <Typography noWrap={true}>{jobTitle}</Typography>
      <Typography noWrap={true}>{companyName}</Typography>
      <Typography className={styles.maxThreeLinesText}>{jobDescription}</Typography>
    </Card>
  )
}

export default Jobcard
