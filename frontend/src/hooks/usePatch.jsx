import axios from "axios"
import { useState } from "react"

export const usePatch = (url) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [data, setData] = useState(null)

    const updateData = async (id, data) => {
        setLoading(true)
        setError(false)

        try {
            const response = await axios.patch(`${url}/${id}`, data)
            setData(response.data)
            console.log(response)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return {updateData, error, loading}
}