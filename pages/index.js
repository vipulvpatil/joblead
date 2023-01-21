import Joblist from "@/components/joblist"
import {Stack} from "@mui/material"
import TabContainer from "@/components/tab_container"
import {useState} from "react"

const Index = () => {
  const [jobs, setJobs] = useState([])


  return (
    <Stack direction="column" sx={{alignItems: "center"}}>
      <TabContainer setJobs={setJobs}/>
      <Joblist jobs={jobs}/>
    </Stack>
  )
}

export default Index
