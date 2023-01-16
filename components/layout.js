import Header from "./header"
import {Typography} from "@mui/material"
import styles from "../styles/Home.module.css"

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <Typography variant="subtitle1">
          &#169; 2022-2023 Vipul Vinod Patil
        </Typography>
      </footer>
    </div>
  )
}

export default Layout
