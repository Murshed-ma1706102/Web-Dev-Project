import * as currentUser from "@/repos/currentUser"


export async function GET(request) {
    // console.log(request)
    // console.log(request.nextUrl.searchParams);
    try {
        // return new Response("HELLO!");
        const user = await currentUser.get();
        
        return Response.json( user, {status:200});
    }catch(error){
        console.log(error.error)
        return Response.json({message: "Not found"}, {status: 404});
    }
}



export async function PUT(request) {
    
    try {
        
        const data = await request.json();
        const user = await currentUser.update(data);
        return Response.json(user, {status: 201});

    }catch(error){
        console.log(error.message)
        return Response.json({message: "Internal error"}, {status: 500});
    }
}