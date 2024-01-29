import { useRouter } from 'next/navigation'

export default function RedirectToMainPage() {
    const router = useRouter();

    router.replace('/');
    return (
        <></>
    )
}
