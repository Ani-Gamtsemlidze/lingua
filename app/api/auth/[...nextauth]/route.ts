import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {

        const user = {
          id: "1",
          email: "test@test.com"
        }

        if(credentials?.email === "test@test.com" &&
           credentials?.password === "123456") {
          return user
        }

        return null
      }
    })
  ]
})

export { handler as GET, handler as POST }