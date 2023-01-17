import Jobcard from "./jobcard"
import styles from "@/styles/Home.module.css"
const {Grid} = require("@mui/material")

const Joblist = () => {
  return(
    <div className={styles.joblist}>
      <Grid container spacing={2}>
        <Grid item mobile={12}>
          <Jobcard 
            jobTitle="Senior Software Engineer" 
            companyName="Boincase" 
            jobDescription="Take a look at the existing code. Make it better. Build new features.\n Right some awesome code such that no one has ever seen or written before."
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Joblist
