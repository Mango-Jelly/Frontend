import dynamic from 'next/dynamic'

const Main = dynamic(() => import("./_component/Main"))

export default function Page() {
  return (
    <>
      <Main />
    </>
  )
}
