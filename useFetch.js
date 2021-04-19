import { useEffect, useState, useRef } from "react"

export const useFetch = (url) => {
    const [state, setState] = useState({data: null, loading: true, error: null})
    const isMounted = useRef(true)

    useEffect(() => {
        return () => {
            isMounted.current = false
            // console.log('desmontado')
        }
    }, [])

    useEffect(() => {
        setState({
            data: null,
            loading: true, 
            error: null
        })
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                // setTimeout(() => {
                    if(isMounted.current){
                        setState({
                            loading: false,
                            error: null,
                            data
                        })
                    }
                // }, 100) 
            }).catch(() => {
                if(isMounted.current){
                    setState({
                        data: null,
                        loading: false,
                        error: 'No se pudo cargar la info'
                    })
                }
            })
    }, [url])

    return state
}
