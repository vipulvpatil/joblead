import errors from "@/common/errors"
import fs from "fs"
import pdfParser from "pdf-parse"

const parsePdf = async (filepath) => {
  let dataBuffer = fs.readFileSync(filepath)
  
  const data = await new Promise((resolve, reject) => {
    pdfParser(dataBuffer)
      .then((data) =>{
        resolve(data.text)
      })
      .catch((err) =>{
        if (err["name"] === "InvalidPDFException"){
          reject(Error(errors.InvalidPdfError))
        } else {
          console.log(err)
          reject(Error(errors.SomethingUnexpectedError))
        }
      })
  })

  return data
}

export default parsePdf
