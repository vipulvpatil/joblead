import {Card, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"


const Jobcard = ({title, company, date, locations, salary, url}) => {
  var localDate = new Date(date)
  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      <Card variant="outlined" className={styles.card}>
        <Typography variant="h4" noWrap={true}>{title}</Typography>
        <Typography variant="h5" noWrap={true}>{company}</Typography>
        <Typography variant="body" className={`${styles.limitedLinesText} ${styles.jobDescription}`}>{salary}</Typography>
        <Typography variant="body" className={`${styles.limitedLinesText} ${styles.jobDescription}`}>{locations}</Typography>
        <Typography variant="body" className={`${styles.limitedLinesText} ${styles.jobDescription}`}>{localDate.toLocaleString()}</Typography>
      </Card>
    </a>
  )
}

export default Jobcard
