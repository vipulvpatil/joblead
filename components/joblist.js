import {CircularProgress, Grid, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import Jobcard from "@/components/jobcard"
import findJobsForPersona from "@/lib/find_jobs"
import {logAnalyticsEvent} from "@/lib/analytics_events"
import styles from "@/styles/Home.module.css"

const Joblist = ({personaData}) => {
  const [searchApiError, setSearchApiError] = useState(null)
  const [searchApiStatus, setSearchApiStatus] = useState(null)
  const [jobs, setJobs] = useState([])
  const [resultantJsx, setResultantJsx] = useState(null)

  useEffect(() => {
    const searchJobs = async () => {
      setSearchApiStatus("pending")
      const jobResults = await findJobsForPersona(personaData)
      setSearchApiError(jobResults.error)
      setSearchApiStatus(jobResults.status)
      if(jobResults.result) {
        setJobs(jobResults.result)
      }
    }
    if(personaData){
      logAnalyticsEvent(window, "JobSearchedEvent", {selectedCity: personaData["selectedCity"]})
      searchJobs()
    }
  }, [personaData])

  useEffect(() => {
    if(searchApiStatus === "pending"){
      setResultantJsx(
        <Grid item mobile={12}>
          <Typography variant="h4" className={styles.jobListStatus}>
            searching jobs
            <CircularProgress size={24} className={styles.jobListProgress}/>
          </Typography>
        </Grid>
      )
    } else if(searchApiStatus === "complete"){
      if(searchApiError){
        setResultantJsx(
          <Grid item mobile={12}>
            <Typography variant="h4" className={styles.jobListStatus}>
              {searchApiError}
            </Typography>
          </Grid>
        )
      } else {
        logAnalyticsEvent(window, "JobsDisplayedEvent", {jobCount: jobs.length})
        if(jobs.length === 0){
          setResultantJsx(
            <Grid item mobile={12}>
              <Typography variant="h4" className={styles.jobListStatus}>
                {"no jobs found. :("}
              </Typography>
            </Grid>
          )
        }
        else {
          setResultantJsx(
            jobs.map((job, index) => {
              return (
                <Grid item mobile={12} key={index}>
                  <Jobcard 
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    date={job.date}
                    locations={job.locations}
                    salary={job.salary}
                    url={job.url}
                    weight={job.weight}
                  />
                </Grid>
              )
            })
          )
        }
      }
    } else {
      setResultantJsx(
        <Grid item mobile={12}>
          <Typography variant="h4" className={styles.jobListStatus}>
            awaiting persona details
          </Typography>
        </Grid>
      )
    }
  }, [searchApiError, searchApiStatus, jobs])

  return(
    <div className={styles.joblist}>
      <Grid container spacing={2}>
        {resultantJsx}
      </Grid>
    </div>
  )
}

export default Joblist
