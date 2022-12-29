import axios from "axios"

/*
    this would be an env variable
    you'd also want to have a "prod"/"dev" deploy condition

    inproduction you would want to import authorization for axios request
*/
const apiURL = "http://localhost:8080"


export const getAverage = async (students) => {
    console.log('api call:', students)
    try {      
        return await axios.post(`${apiURL}/api/transfer`, { students })
    } catch (error) {
        console.log(error)
        return error
    }
}