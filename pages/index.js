import Joblist from "@/components/joblist"
import {Stack} from "@mui/material"
import TabContainer from "@/components/tab_container"
import UploadDiv from "@/components/upload_div"

const Index = () => {
  return (
    <Stack direction="column" sx={{alignItems: "center"}}>
      <TabContainer>
        <UploadDiv/>
        <div>2nd</div>
        <div>3rd</div>
      </TabContainer>
      <Joblist/>
    </Stack>
  )
}

export default Index
