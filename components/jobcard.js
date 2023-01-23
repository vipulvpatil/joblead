import {Card, Typography} from "@mui/material"
import getUserLocale from "get-user-locale"
import styles from "@/styles/Home.module.css"


const Jobcard = ({title, company, date, locations, salary, url, weight}) => {
  const localDate = new Date(date)
  const options = {weekday: "short", year: "numeric", month: "long", day: "numeric"}
  const userLocale = getUserLocale()
  const displayDate = localDate.toLocaleDateString(userLocale, {options})

  let recommendedJsx = null
  if(weight > 20) {
    recommendedJsx = <Typography variant="h6" className={styles.recommendedText}>Recommended</Typography>
  }

  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      <Card variant="outlined" className={styles.card}>
        <Typography variant="h4" noWrap={true}>{title}</Typography>
        <Typography variant="h5" noWrap={true}>{company}</Typography>
        <Typography variant="body" className={`${styles.limitedLinesText} ${styles.jobDescription}`}>{salary}</Typography>
        <Typography variant="body" className={`${styles.limitedLinesText} ${styles.jobDescription}`}>{locations}</Typography>
        <Typography variant="h6">Posted at: {displayDate}</Typography>
        {recommendedJsx}
      </Card>
    </a>
  )
}

export default Jobcard
