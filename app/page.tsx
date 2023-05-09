import { SignIn, SignOut } from "./components/Auth/AuthButtons"
import Form from "./components/Form/Form"
import Image from "next/image"

export default async function Home() {

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
    </main>
  )
}
