import React from "react"

type Props = {
    children: React.ReactNode,
    onClick: () => void
}

const Button = ({children, onClick}: Props) => {
    return (
        <button className="rounded-full ml-4 px-2 py-0 bg-blue-200" onClick={onClick}>{children}</button>
    )
}

export default Button