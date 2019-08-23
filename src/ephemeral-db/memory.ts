import { User } from "src/server/api/users/user.model";

/**
 * Internal, ephemeral file mocking a database 
 * 
 * @author anton-lam
 */


 //list of initial users 
export var users: [User] = [
    {
        id: 1,
        email: "abc@gmail.com",
        isVerified: true,
        password: "password"    
    }
] 

//internal
export var verificationTokens: any[] = [] 
