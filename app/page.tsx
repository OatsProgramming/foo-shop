import { SignIn, SignOut } from "./components/AuthButtons/AuthButtons"
import Form from "./components/Form/Form"
import Image from "next/image"
import itemFetcher from "@/lib/fetchers/itemFetcher"
import { getServerSession } from "next-auth"

export default async function Home() {
  const items = await itemFetcher('headwear', 'be')
  if (!items) {
    console.log('fail')
    return
  }
  return (
    <main>
      <SignIn />
      <SignOut />
      <Form method="POST"/>
      <Image 
        src="https://i.imgur.com/VW57Cg1.jpg"
        alt="bucket hat"
        width={300}
        height={300}
        style={{
          objectFit: 'cover'
        }}
      />
      <pre style={{
        whiteSpace: 'pre-wrap'
      }}>
        {JSON.stringify(items)}
      </pre>
    </main>
  )
}
