import {Tab, Tabs, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import PersonaDiv from "@/components/persona_div"
import UploadDiv from "@/components/upload_div"
import styles from "@/styles/Home.module.css"

const TabContainer = () => {
  const [tabContent, setTabContent] = useState(<UploadDiv/>)
  const [value, setValue] = useState(0)

  const onChange = (e, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    switch(value) {
      case 0:
        setTabContent(<UploadDiv/>)
        break
      case 1:
        setTabContent(<PersonaDiv/>)
        break
      case 2:
        setTabContent(<div>3</div>)
        break
    }
  }, [value])

  return <>
    <Tabs value={value} onChange={onChange} centered className={styles.subheader}>
      <Tab label={<Typography variant="tab">Upload</Typography>} />
      <Tab label={<Typography variant="tab">Persona</Typography>} />
      <Tab label={<Typography variant="tab">About</Typography>} />
    </Tabs>
    <div className={styles.tabContent}>
      {tabContent}
    </div>
  </>
}

export default TabContainer
