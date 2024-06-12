import { isUndefined, toLower } from "lodash"
import { useCallback, useState } from "react"

type Status = "ERROR" | "SUCCESS" | "LOADING" | "IDLE"

type State<T = any> = {
    idle: boolean
    success: boolean
    error: boolean
    loading: boolean
    data: T
}

function useCallAPIState<T = any>(initial: { status: Status, data: T }): [State<T>, (status: Status, data: T) => void] {

    const [state, setState] = useState<State<T>>(
        () => {
            const { data, status } = initial
            const state = {
                idle: false,
                success: false,
                error: false,
                loading: false,
                data: data
            }
        
            state[toLower(status)] = true
            return state
        }
    )

    const updateState = useCallback((status: Status, data?: T) => {
        const state = {
            idle: false,
            success: false,
            error: false,
            loading: false,
        }
        state[toLower(status)] = true
        setState(
            ({ data: currentData }) => ({ ...state, data: isUndefined(data) ? currentData : data })
        )
    }, [])

    return [state, updateState]
}

export default useCallAPIState