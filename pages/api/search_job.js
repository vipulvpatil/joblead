const careerJetSearch = async(localeCode, affid, userIp, userAgent, keywords, location) => {
  const url = "http://public.api.careerjet.net/search?"
  const query = {
    locale_code: localeCode,
    affid: affid,
    user_ip: userIp,
    user_agent: userAgent,
    keywords: keywords,
    location: location,
    sort: "relevance",
    pagesize: "99"
  }

  const response = await fetch(url+ new URLSearchParams(query))
  const responseJson = await response.json()
  return responseJson
}

const SearchJob = async (req, res) => {
  if(req.method !== "GET"){
    res.status(405).json({error: "method not allowed"})
  } else {
    const {
      localeCode, 
      affid, 
      userIp, 
      userAgent,
      keywords,
      location,
    } = req.query

    try {
      if(localeCode && affid && userIp && userAgent && keywords && location) {
        const responseJson = await careerJetSearch(localeCode, affid, userIp, userAgent, keywords, location)
        res.status(200).json({result: responseJson})
      } else {
        res.status(400).json({error: "Invalid request"})
      }  
    } catch (err) {
      res.status(500).json({error: err})
    }
  }
}

export default SearchJob
