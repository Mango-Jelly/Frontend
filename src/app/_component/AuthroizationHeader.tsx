"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = {
    children: React.ReactNode;
};

export default function AuthroizationHeader({ children }: Props) {
    return (
        <>AuthroizationHeader</>
    )
}
