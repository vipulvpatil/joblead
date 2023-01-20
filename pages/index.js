import Joblist from "@/components/joblist"
import {Stack} from "@mui/material"
import TabContainer from "@/components/tab_container"

const Index = () => {
  return (
    <Stack direction="column" sx={{alignItems: "center"}}>
      <TabContainer/>
      <Joblist/>
    </Stack>
  )
}

export default Index
