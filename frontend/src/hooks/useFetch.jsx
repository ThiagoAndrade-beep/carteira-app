import { useState } from "react"
import axios from 'axios';

export const useFetch = (url) => {
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [response, setResponse] = useState(null)

    const postData = async (data) => {
        setLoading(true)
        setError(false)

        try {
            // await new Promise(resolve => setTimeout(resolve, 2000));    
            const res = axios.post(url, data)
            setResponse(res.data)
            console.log(res)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return {postData, loading, error, response}
}