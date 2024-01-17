'use client';

import Link from "next/link";

export default function Page() {
  return (
    <main>
      <Link href="/login">
        로그인하기
      </Link>
      <Link href="/signup">
        회원가입
      </Link>
    </main>
  )
}
