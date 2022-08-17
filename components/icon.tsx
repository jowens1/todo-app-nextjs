import Image from 'next/image'

type Props = {
    iconName: string
    onClick: () => void
}

const Icon = ({iconName, onClick}: Props) =>
    <div className={'flex items-center justify-center'} onClick={onClick}>
        <Image src={`/${iconName}.png`} width='16' height='16' />
    </div>
   
export default Icon