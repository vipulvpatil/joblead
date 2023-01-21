import {Tab, Tabs, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import AboutDiv from "@/components/about_div"
import PersonaDiv from "@/components/persona_div"
import UploadDiv from "@/components/upload_div"
import styles from "@/styles/Home.module.css"

const TabContainer = () => {
  const [tabContent, setTabContent] = useState(<UploadDiv/>)
  const [value, setValue] = useState(0)
  const [personaData, setPersonaData] = useState(null)
  const [resumeApiError, setResumeApiError] = useState(null)
  const [resumeApiStatus, setResumeApiStatus] = useState(null)
  const [searchApiError, setSearchApiError] = useState(null)
  const [searchApiStatus, setSearchApiStatus] = useState(null)

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
    try{
      setResumeApiStatus("pending")
      const response = await fetch("/api/analyse_resume", {
        method: "POST",
        body: formData,
      }, config)
      const responseJson = await response.json()
      setResumeApiError(responseJson["error"])
      setPersonaData(responseJson["result"])
      setResumeApiStatus("complete")
    } catch(err) {
      console.log(err)
      setResumeApiError("error analysing resume")
      setResumeApiStatus("complete")
    }
  }

  useEffect(() => {
    const onFileSelectChange = (event) => {
      if (!event.target.files?.length) {
        return
      }
      uploadResume(event.target.files[0])
    }

    const onSearchClick = () => {
      console.log("What is up?")
      setSearchApiError("no error")
      setSearchApiStatus("no status")
    }

    switch(value) {
      case 0:
        setTabContent(<UploadDiv onChange={onFileSelectChange} apiError={resumeApiError} apiStatus={resumeApiStatus}/>)
        break
      case 1:
        setTabContent(<PersonaDiv personaData={personaData}/>)
        break
      case 2:
        setTabContent(<AboutDiv onClick={onSearchClick} apiError={searchApiError} apiStatus={searchApiStatus}/>)
        break
    }
  }, [value, resumeApiError, personaData, resumeApiStatus, searchApiError, searchApiStatus])

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
