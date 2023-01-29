import {Button, Stack, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import CityConfirmationDialog from "@/components/city_confirmation_dialog"
import EditIcon from "@mui/icons-material/Edit"
import {logAnalyticsEvent} from "@/lib/analytics_events"
import {savePersona} from "@/lib/local_storage"
import styles from "@/styles/Home.module.css"

const PersonaDataItemSingleValue = ({title, personaDataValue, editFunc}) => {
  let editButtonJsx = <></>
  if(editFunc){
    editButtonJsx = (
      <Button
        variant="contained" 
        className={styles.smallButton}
        onClick={editFunc}
      >
        <EditIcon/>
      </Button>
    )

    if(!personaDataValue || personaDataValue === ""){
      personaDataValue = "*city not selected"
    }
  }

  if(personaDataValue){
    return (
      <>
        <Typography variant="h5" className={`${styles.personaDataTitle} ${styles.personaDataDiv}`}>{title}{editButtonJsx}</Typography>
        <Typography variant="body2" className={styles.personaDataValue}>{personaDataValue}</Typography>
      </>
    )
  }
  return null
}

const PersonaDataItemMultipleValues = ({title, personaDataValues}) => {
  if(personaDataValues && personaDataValues.length > 0){
    return (
      <>
        <Typography variant="h5" className={styles.personaDataTitle}>{title}</Typography>
        {
          personaDataValues.slice(0,3).map((personaDataValue, index) => {
            return <Typography variant="body2" className={styles.personaDataValue} key={index}>{personaDataValue}</Typography>
          })
        }  
      </>
    )
  }
  return null
}

const PersonaDiv = ({personaData, setPersonaData}) => {
  const [cityConfirmationDialogOpen, setCityConfirmationDialogOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState(null)

  useEffect(() => {
    if(personaData) {
      setSelectedCity(personaData["selectedCity"])
    }
  }, [personaData])

  const handleCityConfirmationDialogClose = () => {
    const data = {...personaData}
    Object.assign(data, {selectedCity})
    savePersona(data)
    setPersonaData(data)
    logAnalyticsEvent(window, "CityConfirmedEvent", {selectedCity: selectedCity})
    setCityConfirmationDialogOpen(false)
  }

  let displayJsx = <Typography variant="body2">Persona not found. Please begin by uploading a resume.</Typography>
  if(personaData) {
    displayJsx = (
      <>
        <PersonaDataItemSingleValue title="Name" personaDataValue={personaData["name"]}/><div className={styles.spacingDiv}/>
        <PersonaDataItemSingleValue title="Email" personaDataValue={personaData["email"]}/><div className={styles.spacingDiv}/>
        <PersonaDataItemSingleValue title="Mobile" personaDataValue={personaData["mobile"]}/><div className={styles.spacingDiv}/>
        <PersonaDataItemSingleValue title="City" personaDataValue={selectedCity} editFunc={() => {setCityConfirmationDialogOpen(true)}}/><div className={styles.spacingDiv}/>
        <PersonaDataItemMultipleValues title="Top Technical Skills" personaDataValues={personaData["technical"]}/><div className={styles.spacingDiv}/>
        <PersonaDataItemMultipleValues title="Top Soft Skills" personaDataValues={personaData["soft"]}/><div className={styles.spacingDiv}/>
        <PersonaDataItemMultipleValues title="Recommended job positions" personaDataValues={personaData["jobs"]}/><div className={styles.spacingDiv}/>
      </>
    )
  }

  return (
    <>
      <Stack id = "personaTab" direction="column" className={styles.personaStack}>
        {displayJsx}
      </Stack>
      <CityConfirmationDialog
        open={cityConfirmationDialogOpen}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        handleClose={handleCityConfirmationDialogClose}
      />
    </>
  )
}

export default PersonaDiv
