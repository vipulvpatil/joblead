import Jobcard from "@/components/jobcard"
import styles from "@/styles/Home.module.css"
const {Grid} = require("@mui/material")

const Joblist = ({jobs}) => {
  const jobsJsx = jobs.map((job, index) => {
    return (
      <Grid item mobile={12} key={index}>
        <Jobcard 
          jobTitle={job.title}
          companyName={job.company}
          jobDescription={job.description}
        />
      </Grid>
    )
  }) 

  return(
    <div className={styles.joblist}>
      <Grid container spacing={2}>
        {jobsJsx}
      </Grid>
    </div>
  )
}

export default Joblist
