import {Box, Button, CircularProgress, Stack, Typography} from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import Joblist from "@/components/joblist"
import UploadDiv from "@/components/upload_div"
import styles from "@/styles/Home.module.css"

const Index = () => {
  return (
    <>
      <Stack direction="column" sx={{alignItems: "center"}}>
      <UploadDiv/>
      <Joblist/>
      <Box>
        Blank Index page
        <br/><br/><br/>
        <Button className={styles.textButton}>
          <Typography variant="smallLink">
            Sample Link Button
          </Typography>
        </Button>
        <br/><br/><br/>
        <Button variant="contained">
          <CreateIcon />
        </Button>
        <br/><br/><br/>
        <Button variant="contained">
          <DeleteForeverIcon />
        </Button>

        <br/><br/><br/>
        <CircularProgress
          size={24}
          color="inherit"
        />
      </Box>
      </Stack>
    </>
  )
}

export default Index
