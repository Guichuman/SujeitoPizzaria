import prismaClient from "../../prisma"
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'

interface LoginRequest{
    email: string,
    password: string
}

class LoginUserService{
    async execute({ email, password }: LoginRequest){

        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("User incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Password incorrect")
        }

        const token = sign({
            name: user.name,
            email: user.email
        }, 
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '30d'
        }
        )

        return {
            id: user.id,
            name: user.name,
            token: token
        }
    }
}

export { LoginUserService }