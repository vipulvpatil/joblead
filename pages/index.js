import Joblist from "@/components/joblist"
import {Stack} from "@mui/material"
import TabContainer from "@/components/tab_container"
import {useState} from "react"

const Index = () => {
  const [personaData, setPersonaData] = useState(null)

  return (
    <Stack direction="column" sx={{alignItems: "center"}}>
      <TabContainer personaData={personaData} setPersonaData={setPersonaData}/>
      <Joblist personaData={personaData}/>
    </Stack>
  )
}

export default Index
