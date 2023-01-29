const eventMap = {
  AboutTabOpenedEvent: "JL_AboutTabOpened",
  PersonaTabOpenedEvent: "JL_PersonaTabOpened",
  UploadTabOpenedEvent: "JL_UploadTabOpened",
  ResumeUploadedEvent: "JL_ResumeUploaded",
  CityConfirmedEvent: "JL_CityConfirmed",
  JobSearchedEvent: "JL_JobSearched",
  JobsDisplayedEvent: "JL_JobsDisplayed"
}

export const logAnalyticsEvent = (window, eventName, data = null) => {
  const event = eventMap[eventName]
  if(!event) {
    return
  }
  let eventWithData
  if(data){
    eventWithData = Object.assign({event}, data)
  } else {
    eventWithData = {event}
  }
  if (window && window.dataLayer) {
    window.dataLayer.push(eventWithData)
  }
}
