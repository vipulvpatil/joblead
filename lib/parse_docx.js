import errors from "@/common/errors"
import mammoth from "mammoth"

const parseDocX = async (filepath) => {
  try{
  const data = await mammoth.extractRawText({path: filepath})
  return data.value
  } catch (err) {
    throw Error(errors.InvalidDocxError)
  }
  
}

export default parseDocX
