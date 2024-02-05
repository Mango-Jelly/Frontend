import { redirect } from "next/navigation";
import { auth } from "@/auth";

import Signup from '@/app/@modal/(.)signup/_component/Signup';

export default async function Page() {
    const session = await auth();

    if (session?.user) redirect('/');

    return (
        <Signup />
    )
}
