import {useEffect, useState} from "react"
import Joblist from "@/components/joblist"
import LoadingPersonaConfirmationDialog from "@/components/loading_persona_confirmation_dialog"
import {Stack} from "@mui/material"
import TabContainer from "@/components/tab_container"
import {loadPersona} from "@/lib/local_storage"

const Index = () => {
  const [personaData, setPersonaData] = useState(null)
  const [personaLoadedFromStorage, setPersonaLoadedFromStorage] = useState(null)
  const [openPersonaLoaderDialog, setOpenPersonaLoaderDialog] = useState(false)
  const [personaLoadedMessage, setPersonaLoadedMessage] = useState("")

  useEffect(() => {
    setPersonaLoadedFromStorage(loadPersona())
  }, [])

  useEffect(() => {
    setOpenPersonaLoaderDialog(!!personaLoadedFromStorage)
  }, [personaLoadedFromStorage])

  const continuePersonaLoading = () => {
    setPersonaData(personaLoadedFromStorage)
    setPersonaLoadedMessage("persona loaded from storage")
    setOpenPersonaLoaderDialog(false)
  }

  const skipPersonaLoading = () => {
    setOpenPersonaLoaderDialog(false)
  }

  return (
    <>
      <Stack direction="column" sx={{alignItems: "center"}}>
        <TabContainer personaData={personaData} setPersonaData={setPersonaData} personaLoadedMessage={personaLoadedMessage}/>
        <Joblist personaData={personaData}/>
      </Stack>
      <LoadingPersonaConfirmationDialog open={openPersonaLoaderDialog} handleContinue={continuePersonaLoading} handleSkip={skipPersonaLoading}/>
    </>
  )
}

export default Index
