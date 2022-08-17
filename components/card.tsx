type Props = {
    children?: React.ReactNode
}

const Card = ({children}: Props) => 
    <div className="flex flex-col w-1/2 p-4 mb-4 bg-slate-100 border-solid border border-gray-700 rounded items-center justify-center">
        {children}
    </div>

export default Card