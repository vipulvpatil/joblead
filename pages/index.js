import {Button, CircularProgress, Typography} from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import styles from "@/styles/Home.module.css"

const Index = () => {
  return (
    <> 
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
    </>
  )
}

export default Index
