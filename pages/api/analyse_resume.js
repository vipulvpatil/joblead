import {analyseResume, buildPersona} from "@/lib/persona_builder"
import FileParser from "@/lib/file_parser"
import formidable from "formidable"

export const config = {
  api: {
    bodyParser: false,
  },
}

const formParseCallbackFunc = (res) => async (err, fields, files) => {
  if (err) {
    res.status(400).json({error: err})
  } else if (files && files["resume"]){
    const {data, err} = await FileParser.parse(files["resume"])
    if(data) {
      try {
        const analysedResume = await analyseResume(data)
        const persona = await buildPersona(analysedResume)
        res.status(200).json({result: persona})
      } catch(err) {
        console.log(err)
        res.status(400).json({error: err})
      }
    } else if(err) {
      res.status(400).json({error: err})
    } else {
      res.status(500).json({error: "file parser failed"})
    }
  } else{
    res.status(400).json({error: "resume file not found"})
  }
}

const AnalyseResume = async (req, res) => {
  if(req.method !== "POST"){
    res.status(405).json({error: "method not allowed"})
  } else {
    const form = new formidable.IncomingForm()
    form.parse(req, formParseCallbackFunc(res))
  }
}

export default AnalyseResume
