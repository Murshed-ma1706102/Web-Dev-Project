import * as users from "@/repos/users"

export async function GET(request, {params}) {
    
    const { id } = params;
    
    try {
        
        const user = await users.get(id);

        if(!user) {
            
            return Response.json({message: "Not found"}, {status: 404})
        }else {
            return Response.json(user, { status: 200 , id: id});
        }
    }catch(error){
        console.log(error.message)
    }
}