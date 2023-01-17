import formidable from "formidable"
import mammoth from "mammoth"

export const config = {
  api: {
    bodyParser: false,
  },
}

const ProcessResume = async (req, res) => {
  if(req.method !== "POST"){
    res.status(405).json({error: "method not allowed"})
  } else {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      const filepath = files["resume"].filepath
      console.log(files["resume"].originalFilename)
      
      const data = await mammoth.extractRawText({path: filepath})
      console.log(data)
    })

    res.status(200)
    res.json({result: "okay"})
  }
}

export default ProcessResume
