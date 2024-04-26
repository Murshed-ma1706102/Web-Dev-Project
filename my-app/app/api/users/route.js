import * as users from "@/repos/users"

export async function GET(request) {
    // console.log(request)
    // console.log(request.nextUrl.searchParams);
    try {
        // return new Response("HELLO!");
        return Response.json( await users.get(), {status:200});
    }catch(error){
        console.log(error)
        return Response.json({message: "Internal error"}, {status: 500});
    }
}

export async function PUT(request) {
    
    try {
        
        const data = await request.json();
        const user = await users.update(data);
        return Response.json(user, {status: 201});

    }catch(error){
        console.log(error.message)
        return Response.json({message: "Internal error"}, {status: 500});
    }
}