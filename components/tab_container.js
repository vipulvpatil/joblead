import {Tab, Tabs, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import styles from "@/styles/Home.module.css"

const TabContainer = ({children}) => {
  const [processedChildren, setProcessedChildren] = useState(children)
  const [value, setValue] = useState(0)

  const onChange = (e, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    let index = -1
    const newChilden = children.map(child => {
      index++
      if (index != value) {
        return <div className={styles.hidden} key={child.key}>{child}</div>
      }
      return <div key={child.key}>{child}</div>
    })
    setProcessedChildren(newChilden)
  }, [children, value])

  return <>
    <Tabs value={value} onChange={onChange} centered className={styles.subheader}>
      <Tab label={<Typography variant="tab">Upload</Typography>} />
      <Tab label={<Typography variant="tab">Persona</Typography>} />
      <Tab label={<Typography variant="tab">Help</Typography>} />
    </Tabs>
    <div className={styles.tabContent}>
      {processedChildren}
    </div>
  </>
}

export default TabContainer
