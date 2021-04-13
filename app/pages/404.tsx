import Link from 'next/link'

export default function Custom404() {
  return (
    <div className=" text-3xl font-light text-center p-20 my-10 h-screen">
      <h1>404 - Hi there! You're looking for a weather forecast?</h1>
      <span className="font-bold">
        <Link href="/">Click here</Link>
      </span>
    </div>
  )
}
