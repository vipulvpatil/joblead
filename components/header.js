
import Image from "next/image"
import styles from "@/styles/Home.module.css"

const Header = () => {
  return (
    <div className={styles.header}>
      <Image 
        src="/jobleadnewlogo.png" 
        alt="JOB LEAD logo"
        width={114} height={98}
      />
    </div>
  )
}

export default Header
