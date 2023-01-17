import formidable from "formidable"
import fs from "fs"

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
    form.parse(req, (err, fields, files) => {
      console.log(files)

      const data = fs.readFileSync(files["resume"].filepath, "utf8")
      console.log(data)
    })

    res.status(200)
    res.json({result: "okay"})
  }
}

export default ProcessResume
