import {Box, Grid, Typography} from "@mui/material"
import Link from "next/link"
import styles from "../styles/Home.module.css"

const Header = () => {
  return (
    <Box className={styles.header}>
      <Grid container 
        alignItems="center"
      >
        <Grid 
          item mobile={12} tablet={10}
          justifyContent={{mobile: "center", tablet:"start"}} 
          textAlign={{mobile: "center", tablet:"start"}}
          paddingLeft={{mobile: "0px", tablet:"20px"}}
          className={styles.title}
        >
          <Link href= "/">
            <Typography variant="h1">
              Job Lead
            </Typography>
          </Link>
        </Grid>
        <Grid 
          item mobile={12} tablet={2}
          justifyContent={{mobile: "center", tablet:"end"}} 
          textAlign={{mobile: "center", tablet:"end"}}
          paddingRight={{mobile: "0px", tablet:"20px"}}
          paddingTop={{mobile: "20px", tablet:"0px"}}
          className={styles.title}
        >
        </Grid>
      </Grid>
    </Box>
  )
}

export default Header
