import {Tab, Tabs} from "@mui/material"
import styles from "@/styles/Home.module.css"
import {useState} from "react"

const SubHeader = () => {
  const [value, setValue] = useState(0)

  const onChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <Tabs value={value} onChange={onChange} centered className={styles.subheader}>
      <Tab label="Upload" />
      <Tab label="LinkedIn" />
      <Tab label="History" />
    </Tabs>
  )
}

export default SubHeader
