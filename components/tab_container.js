import {Tab, Tabs, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import AboutDiv from "@/components/about_div"
import CityConfirmationDialog from "@/components/city_confirmation_dialog"
import PersonaDiv from "@/components/persona_div"
import UploadDiv from "@/components/upload_div"
import styles from "@/styles/Home.module.css"

const MaxResumeFileSize = 524288

const TabContainer = ({personaData, setPersonaData}) => {
  const [tabContent, setTabContent] = useState(<UploadDiv/>)
  const [value, setValue] = useState(0)
  const [resumeApiError, setResumeApiError] = useState(null)
  const [resumeApiStatus, setResumeApiStatus] = useState(null)
  const [cityConfirmationDialogOpen, setCityConfirmationDialogOpen] = useState(false)
  const [resumeAnalysisResult, setResumeAnalysisResult] = useState(null)
  
  const onTabChange = (e, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if(resumeAnalysisResult) {
      setCityConfirmationDialogOpen(true)
    }
  }, [resumeAnalysisResult])

  useEffect(() => {
    const uploadResume = async(resumeFile) => {
      if(resumeFile.size > MaxResumeFileSize) {
        setResumeApiError("Resume size too big. Max size: "+MaxResumeFileSize/1024+" mb")
        setResumeApiStatus("complete")
        return
      }

      const formData = new FormData()
      formData.append("resume", resumeFile)
  
      const config = {
        headers: {"content-type": "multipart/form-data"},
      }
      try{
        setResumeApiStatus("pending")
        const response = await fetch("/api/analyse_resume", {
          method: "POST",
          body: formData,
        }, config)
        const responseJson = await response.json()
        setResumeApiError(responseJson["error"])
        setResumeAnalysisResult(responseJson["result"])
        setResumeApiStatus("complete")
      } catch(err) {
        console.log(err)
        setResumeApiError("error analysing resume")
        setResumeApiStatus("complete")
      }
    }

    const onFileSelectChange = (event) => {
      if (!event.target.files?.length) {
        return
      }
      uploadResume(event.target.files[0])
    }

    switch(value) {
      case 0:
        setTabContent(<UploadDiv onChange={onFileSelectChange} apiError={resumeApiError} apiStatus={resumeApiStatus}/>)
        break
      case 1:
        setTabContent(<PersonaDiv personaData={personaData}/>)
        break
      case 2:
        setTabContent(<AboutDiv/>)
        break
    }
  }, [value, resumeApiError, personaData, resumeApiStatus, setPersonaData])

  const handleConfirmationDialogClose = () => {
    console.log(resumeAnalysisResult.city)
    setPersonaData(resumeAnalysisResult)
    setResumeAnalysisResult(null)
    setCityConfirmationDialogOpen(false)
  }

  return <>
    <Tabs value={value} onChange={onTabChange} centered className={styles.subheader}>
      <Tab label={<Typography variant="tab">Upload</Typography>} />
      <Tab label={<Typography variant="tab">Persona</Typography>} />
      <Tab label={<Typography variant="tab">About</Typography>} />
    </Tabs>
    <div className={styles.tabContent}>
      {tabContent}
    </div>
    <CityConfirmationDialog open={cityConfirmationDialogOpen} handleClose={handleConfirmationDialogClose}/>
  </>
}

export default TabContainer
