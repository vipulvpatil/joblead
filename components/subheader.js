
import {Tab, Tabs} from "@mui/material"
import {useState} from "react"

const SubHeader = () => {
  const [value, setValue] = useState(0)

  const onChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <Tabs value={value} onChange={onChange} centered>
      <Tab label="Upload" />
      <Tab label="LinkedIn" />
      <Tab label="History" />
    </Tabs>
  )
}

export default SubHeader
