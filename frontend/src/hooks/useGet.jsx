import axios from "axios";
import { useEffect, useState } from "react";

export const useGet = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            setError(false)

            try {
                const res = await axios.get(url)
                setData(res.data)   
                console.log(res)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [url]) //disparando a função quando a url mudar


    return {data, loading, error}
}