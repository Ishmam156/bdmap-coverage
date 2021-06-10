import { useState } from 'react'

// Custom hook to help with form values and reset value
const useField = (type, name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => setValue(event.target.value)

    const reset = () => setValue('')

    return [
        {
            name,
            type,
            value,
            onChange,
        },
        reset,
    ]
}

export default useField
