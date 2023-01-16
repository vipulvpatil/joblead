
import Image from "next/image"
import styles from "@/styles/Home.module.css"

const Header = () => {
  return (
    <div className={styles.header}>
      <Image 
        src="/jobleadlogo.png" 
        alt="JOB LEAD logo"
        width={226} height={65}
      />
    </div>
  )
}

export default Header
