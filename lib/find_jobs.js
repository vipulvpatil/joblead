
import {createHash} from "crypto"
import {findJobsByKeywords} from "@/lib/careerjet"

const addHashToJobs = (jobs) => {
  const jobsWithId = jobs.map((job) => {
    const id = createHash("sha256").update(job["url"]).digest("hex")
    return Object.assign(job, {id})
  })
  return jobsWithId
}

const findUniqueJobsMap = async (technicalSkills, city, weight) => {
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
      uniqueJobsMap[job.id] = Object.assign(job, {weight: weight})
    } else {
      uniqueJobsMap[job.id].weight = uniqueJobsMap[job.id].weight + weight
    }
  })
  return uniqueJobsMap
}

const findJobsForPersona = async(persona) => {
  if (!persona) {
    return {
      error: "Once a persona is built, your recommended jobs will appear here.",
      status: "complete",
      result: null
    }
  }
  try{
    const uniqueJobsForDesignations = await findUniqueJobsMap(
      persona["jobs"], 
      persona["city"],
      10,
    )

    const uniqueJobsForTechnicalSkill = await findUniqueJobsMap(
      persona["technical"], 
      persona["city"],
      5
    )

    Object.keys(uniqueJobsForTechnicalSkill).forEach((key) => {
      if(Object.hasOwn(uniqueJobsForDesignations, key)) {
        uniqueJobsForDesignations[key].weight = uniqueJobsForDesignations[key].weight + uniqueJobsForTechnicalSkill[key].weight
      }
    })

    const uniqueJobsForSoftSkill = await findUniqueJobsMap(
      persona["soft"], 
      persona["city"],
      3
    )

    Object.keys(uniqueJobsForSoftSkill).forEach((key) => {
      if(Object.hasOwn(uniqueJobsForDesignations, key)) {
        uniqueJobsForDesignations[key].weight = uniqueJobsForDesignations[key].weight + uniqueJobsForSoftSkill[key].weight
      }
    })

    const sortedJobs = Object.values(uniqueJobsForDesignations).sort((jobA, jobB) => {
      return jobB.weight - jobA.weight
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
