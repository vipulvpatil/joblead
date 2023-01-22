import getUserLocale from "get-user-locale"

export const findJobsByKeywords = async(keywords, city) => {
  const url = "/api/search_job?"
  const query = {
    localeCode: getUserLocale().replace(/-/,"_"),
    affid: "95a5757afc5d25b39970d6d5e368f5d3",
    userAgent: window.navigator.userAgent,
    keywords : keywords,
    location : city,
  }
  try{
    const requestUrl = url + new URLSearchParams(query)
    const response = await fetch(requestUrl)
    const responseJson = await response.json()
    if(responseJson && responseJson["result"] && responseJson["result"]["jobs"]){
      return(responseJson["result"]["jobs"])
    }
    console.log("no matching jobs")
    return null
  } catch (err) {
    console.log(err)
    return null
  }
}
