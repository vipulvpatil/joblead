import {Tab, Tabs, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import PersonaDiv from "@/components/persona_div"
import UploadDiv from "@/components/upload_div"
import styles from "@/styles/Home.module.css"

const TabContainer = () => {
  const [tabContent, setTabContent] = useState(<UploadDiv/>)
  const [value, setValue] = useState(0)
  const [apiError, setApiError] = useState("")

  const onTabChange = (e, newValue) => {
    setValue(newValue)
  }

  const uploadResume = async(resumeFile) => {
    const formData = new FormData()
    formData.append("resume", resumeFile)

    const config = {
      headers: {"content-type": "multipart/form-data"},
      onUploadProgress: (event) => {
        console.log("Current progress:", Math.round((event.loaded * 100) / event.total))
      },
    }

    const response = await fetch("/api/analyse_resume", {
      method: "POST",
      body: formData,
    }, config)
    const responseJson = await response.json()
    setApiError(responseJson["error"])
  }

  useEffect(() => {
    const onFileSelectChange = (event) => {
      if (!event.target.files?.length) {
        return
      }
      uploadResume(event.target.files[0])
    }

    switch(value) {
      case 0:
        setTabContent(<UploadDiv onChange={onFileSelectChange} apiError={apiError}/>)
        break
      case 1:
        setTabContent(<PersonaDiv/>)
        break
      case 2:
        setTabContent(<div>3</div>)
        break
    }
  }, [value, apiError])

  return <>
    <Tabs value={value} onChange={onTabChange} centered className={styles.subheader}>
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
