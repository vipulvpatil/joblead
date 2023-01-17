import Joblist from "@/components/joblist"
import {Stack} from "@mui/material"
import UploadDiv from "@/components/upload_div"

const Index = () => {
  return (
    <Stack direction="column" sx={{alignItems: "center"}}>
      <UploadDiv/>
      <Joblist/>
    </Stack>
  )
}

export default Index
