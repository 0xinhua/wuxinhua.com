import { useRouter } from "next/router"
import { Props } from "next/script"

import Container from './../components/container'
import Header from './../components/header'
import Layout from './../components/layout'

export default function About ({ }: Props) {
  const router = useRouter()
  return (
    <Layout>
      <Container>
        <Header />
      </Container>
    </Layout>
  )
}
