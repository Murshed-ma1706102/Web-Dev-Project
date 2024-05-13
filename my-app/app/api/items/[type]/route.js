import * as items from "@/repos/items"

export async function GET(request, {params}) {
    
    const { type } = params;
    
    try {
        // return new Response("HELLO!");
        return Response.json( await items.get(type), {status:200});
    }catch(error){
        console.log(error)
        return Response.json({message: "Internal error"}, {status: 500});
    }
}