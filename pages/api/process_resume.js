const ProcessResume = async (req, res) => {
  if(req.method !== "POST"){
    res.status(405).json({error: "method not allowed"})
  } else {
    res.status(200)
    res.json({result: "okay"})
  }
}

export default ProcessResume
