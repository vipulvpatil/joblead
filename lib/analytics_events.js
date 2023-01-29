const eventMap = {
  OpenedAboutTabEvent: "OpenedAboutTab",
  OpenedPersonaTabEvent: "OpenedPersonaTab",
  OpenedUploadTabEvent: "OpenedUploadTab",
}

export const logAnalyticsEvent = (window, eventName) => {
  const event = eventMap[eventName]
  if (window && window.dataLayer && event) {
    window.dataLayer.push({event})
  }
}
