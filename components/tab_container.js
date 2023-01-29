import {Tab, Tabs, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import AboutDiv from "@/components/about_div"
import CityConfirmationDialog from "@/components/city_confirmation_dialog"
import PersonaDiv from "@/components/persona_div"
import UploadDiv from "@/components/upload_div"
import {logAnalyticsEvent} from "@/lib/analytics_events"
import {savePersona} from "@/lib/local_storage"
import styles from "@/styles/Home.module.css"

const MaxResumeFileSize = 524288

const TabContainer = ({personaData, setPersonaData, personaLoadedMessage}) => {
  const [tabContent, setTabContent] = useState(<UploadDiv/>)
  const [value, setValue] = useState(0)
  const [personaBuilderMessage, setPersonaBuilderMessage] = useState(null)
  const [personaBuilderStatus, setPersonaBuilderStatus] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [resumeAnalysisResult, setResumeAnalysisResult] = useState(null)
  const [cityConfirmationDialogOpen, setCityConfirmationDialogOpen] = useState(false)
  
  const onTabChange = (e, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if(personaLoadedMessage) {
      setPersonaBuilderStatus("complete")
      setPersonaBuilderMessage(personaLoadedMessage)
    }
  }, [personaLoadedMessage])
    
  useEffect(() => {
    const handleResumeUploadResponse = (responseJson) => {
      setPersonaBuilderMessage(responseJson["error"])
      setResumeAnalysisResult(responseJson["result"])
      const cityInResponse = responseJson["result"]?.city
      setPersonaBuilderStatus("complete")
      setSelectedCity(cityInResponse)
      setCityConfirmationDialogOpen(true)
    }

    const uploadResume = async(resumeFile) => {
      if(resumeFile.size > MaxResumeFileSize) {
        setPersonaBuilderMessage("Resume size too big. Max size: "+MaxResumeFileSize/1024+" mb")
        setPersonaBuilderStatus("complete")
        return
      }

      const formData = new FormData()
      formData.append("resume", resumeFile)
  
      const config = {
        headers: {"content-type": "multipart/form-data"},
      }
      try{
        setPersonaBuilderStatus("pending")
        const response = await fetch("/api/analyse_resume", {
          method: "POST",
          body: formData,
        }, config)
        const responseJson = await response.json()
        handleResumeUploadResponse(responseJson)
      } catch(err) {
        console.log(err)
        setPersonaBuilderMessage("error analysing resume")
        setPersonaBuilderStatus("complete")
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
        logAnalyticsEvent(window, "OpenedUploadTabEvent")
        setTabContent(
          <UploadDiv
            onChange={onFileSelectChange}
            personaBuilderMessage={personaBuilderMessage}
            personaBuilderStatus={personaBuilderStatus}
          />
        )
        break
      case 1:
        logAnalyticsEvent(window, "OpenedPersonaTabEvent")
        setTabContent(
          <PersonaDiv
            personaData={personaData}
            setPersonaData={setPersonaData}
          />
        )
        break
      case 2:
        logAnalyticsEvent(window, "OpenedAboutTabEvent")
        setTabContent(<AboutDiv/>)
        break
    }
  }, [value, personaBuilderMessage, personaData, setPersonaData, personaBuilderStatus])

  const saveAndSetPersonaData = (data) => {
    savePersona(data)
    setPersonaData(data)
  }

  const handleCityConfirmationDialogClose = () => {
    if(resumeAnalysisResult) {
      saveAndSetPersonaData(Object.assign(resumeAnalysisResult, {selectedCity}))
      setResumeAnalysisResult(null)
    }
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
    <CityConfirmationDialog 
      open={cityConfirmationDialogOpen}
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      handleClose={handleCityConfirmationDialogClose}
    />
  </>
}

export default TabContainer
