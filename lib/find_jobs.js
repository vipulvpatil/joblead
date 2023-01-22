
import {createHash} from "crypto"
import {findJobsByKeywords} from "@/lib/careerjet"

const addHashToJobs = (jobs) => {
  const jobsWithId = jobs.map((job) => {
    const id = createHash("sha256").update(job["url"]).digest("hex")
    return Object.assign(job, {id})
  })
  return jobsWithId
}

const findUniqueJobsMap = async (technicalSkills, city) => {
  const allJobs = []
  for (const skill of technicalSkills) {
    const jobs = await findJobsByKeywords(skill, city)
    if(jobs) {
      const jobsWithId = addHashToJobs(jobs)
      allJobs.push(...jobsWithId)
    }
  }

  const uniqueJobsMap = {}
  allJobs.forEach((job) => {
    if(!Object.hasOwn(uniqueJobsMap, job.id)) {
      uniqueJobsMap[job.id] = Object.assign(job, {matchCount: 1})
    } else {
      uniqueJobsMap[job.id].matchCount = uniqueJobsMap[job.id].matchCount + 1
    }
  })
  return uniqueJobsMap
}

const findJobsForPersona = async(persona) => {
  if (!persona) {
    return {
      error: "Persona not found. Please begin by uploading a resume.",
      status: "complete",
      result: null
    }
  }
  try{
    const uniqueJobsForDesignations = await findUniqueJobsMap(
      persona["jobs"], 
      persona["city"]
    )

    const uniqueJobsForTechnicalSkill = await findUniqueJobsMap(
      persona["technical"], 
      persona["city"]
    )

    Object.keys(uniqueJobsForTechnicalSkill).forEach((key) => {
      if(Object.hasOwn(uniqueJobsForDesignations, key)) {
        uniqueJobsForDesignations[key].matchCount = uniqueJobsForDesignations[key].matchCount + uniqueJobsForTechnicalSkill[key].matchCount
      }
    })

    const uniqueJobsForSoftSkill = await findUniqueJobsMap(
      persona["soft"], 
      persona["city"]
    )

    Object.keys(uniqueJobsForSoftSkill).forEach((key) => {
      if(Object.hasOwn(uniqueJobsForDesignations, key)) {
        uniqueJobsForDesignations[key].matchCount = uniqueJobsForDesignations[key].matchCount + uniqueJobsForSoftSkill[key].matchCount
      }
    })

    const sortedJobs = Object.values(uniqueJobsForDesignations).sort((jobA, jobB) => {
      return jobB.matchCount - jobA.matchCount
    })

    return {
      error: null, 
      status: "complete", 
      result: sortedJobs
    }
  } catch(err) {
    console.log(err)
    return {
      error: "error searching",
      status: "complete",
      result: null
    }
  }
}

export default findJobsForPersona
