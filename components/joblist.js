import Jobcard from "./jobcard"
import styles from "@/styles/Home.module.css"
const {Grid} = require("@mui/material")

const Joblist = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      companyName: "Boincase",
      description: "Take a look at the existing code. Make it better. Build new features.\n Write some awesome code such that no one has ever seen or written before"
    },
    {
      id: 2,
      title: "Software Engineer",
      companyName: "Doogle",
      description: "Don't be evil. Build new features.\n Write some awesome code such that no one has ever seen or written before"
    },
    {
      id: 3,
      title: "Senior Software Director",
      companyName: "Bola",
      description: "Write some awesome code such that no one has ever seen or written before. Or just do management stuff"
    },
    {
      id: 4,
      title: "Director of Awesomeness",
      companyName: "Barney and Stinson",
      description: "Always be awesome. Except when you are sad. When you are sad, stop being sad and be awesome instead"
    },
    {
      id: 5,
      title: "Head of Sarcasm",
      companyName: "Chan Chan Man",
      description: "You are not good enough for this. Go try elsewhere and when you get rejected, come back try here as well so we can reject you again. No seriously, you are not good enough for this job. Can I be anymore clear?"
    },
  ]

  const jobsJsx = jobs.map((job) => {
    return (
      <Grid item mobile={12} key={job.id}>
        <Jobcard 
          jobTitle={job.title}
          companyName={job.companyName}
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
