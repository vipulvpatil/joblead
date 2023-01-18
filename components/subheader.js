import {Tab, Tabs, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"
import {useState} from "react"

const SubHeader = () => {
  const [value, setValue] = useState(0)

  const onChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <Tabs value={value} onChange={onChange} centered className={styles.subheader}>
      <Tab label={<Typography variant="tab">Upload</Typography>} />
      <Tab label={<Typography variant="tab">Persona</Typography>} />
      <Tab label={<Typography variant="tab">Help</Typography>} />
    </Tabs>
  )
}

export default SubHeader
