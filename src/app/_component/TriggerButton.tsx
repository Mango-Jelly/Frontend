type Props = {
    name: string,
    isSubmitting: boolean
}


export default function TriggerButton({ name, isSubmitting }: Props) {
    return (
        <button
            title='로그인/로그아웃 버튼'
            type='button'
            className={`text-white font-semibold text-3xl text-center bg-main hover:bg-maindark rounded-[2rem] px-12 py-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
        >
            {name}
        </button >
    )
}
