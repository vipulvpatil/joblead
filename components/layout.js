import Header from "./header"
import HelperText from "./helper_text"
import SubHeader from "./subheader"
import {Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <Header />
      <HelperText />
      <SubHeader />
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <Typography variant="footer">
          &#169; 2022-2023 Vipul Vinod Patil
        </Typography>
      </footer>
    </div>
  )
}

export default Layout
