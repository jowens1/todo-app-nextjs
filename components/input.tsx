import {  forwardRef, Ref } from "react"

type Props = {
    placeholder?: string,
}

const Input = forwardRef<HTMLInputElement, Props>(({ placeholder = 'Placeholder text'}: Props, ref) => {
    return (
        <>
            <input className="border border-solid rounded ml-4" ref={ref} placeholder={placeholder}/>
        </>
    )
})

Input.displayName = 'Input'

export default Input