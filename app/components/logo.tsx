import Image from 'next/image'

export default function Logo({shade, menu=false}: {shade: string, menu?: boolean}) {
    return (
        <Image
            src={shade == 'dark' ? "/logo-dark.svg" : "/logo-light.svg"}
            width={!menu ? 100 : 75}
            height={!menu ? 150 : 100}
            alt="Ranq logo"
        />
    )
}