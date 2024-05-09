import * as items from "@/repos/items"

export async function GET(request) {
    
    try {
        console.log(request.json().itemId)
        return Response.json( await items.get(), {status:200});
    }catch(error){
        console.log(error)
        return Response.json({message: "Internal error"}, {status: 500});
    }
}

export async function PUT(request) {
    
    try {
        
        const data = await request.json();
        const item = await items.update(data);
        return Response.json(item, {status: 201});

    }catch(error){
        console.log(error.message)
        return Response.json({message: "Internal error"}, {status: 500});
    }
}