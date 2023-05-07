import { getServerSession } from "next-auth/next"
import { SignIn, SignOut } from "./components/AuthButtons/AuthButtons"
import Form from "./components/Form/Form"
import Image from "next/image"

export default async function Home() {
  // DONT ADD authOption INTO THE getServerSession OPTIONS
  const session = await getServerSession()
  if (!session) console.log('no user')
  return (
    <main>
      {/* <pre>{JSON.stringify(session)}</pre>
      <SignIn />
      <SignOut />
      <Form method="DELETE"/> */}
      <Image 
        src="https://i.imgur.com/VW57Cg1.jpg"
        alt="bucket hat"
        width={300}
        height={300}
        style={{
          objectFit: 'cover'
        }}
      />
    </main>
  )
}
