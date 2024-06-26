import * as purchasedItem from "@/repos/purchasedItem"


export async function GET(request) {
    // console.log(request)
    // console.log(request.nextUrl.searchParams);
    try {
        // return new Response("HELLO!");
        return Response.json( await purchasedItem.get(), {status:200});
    }catch(error){
        console.log(error)
        return Response.json({message: "Internal error"}, {status: 500});
    }
}


export async function PUT(request) {
    
    try {
        
        const data = await request.json();
        const item = await purchasedItem.update(data);
        return Response.json(item, {status: 201});

    }catch(error){
        console.log(error.message)
        return Response.json({message: "Internal error"}, {status: 500});
    }
}