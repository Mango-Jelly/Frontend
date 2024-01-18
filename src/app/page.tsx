'use client';

import Link from "next/link";

const videos = [1, 2, 3];
const scenarios = [1, 2, 3];

export default function Page() {

  return (
    <main>
      <Link href="/login">
        로그인하기
      </Link>
      <Link href="/signup">
        회원가입
      </Link>
      <Link href="/newroom">
        방생성
      </Link>
      <div>
        {videos.map((item, index) => {
          return (
            <div key={index}>
              <Link href={`/video/${item}`}>open {item} video modal</Link>
            </div>
          );
        })}
      </div>
      <div>
        {scenarios.map((item, index) => {
          return (
            <div key={index}>
              <Link href={`/scenario/${item}`}>open {item} scenario modal</Link>
            </div>
          );
        })}
      </div>
    </main>
  )
}
