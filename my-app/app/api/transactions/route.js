import * as transactions from "@/repos/transactions"

export async function GET(request) {
    // console.log(request)
    // console.log(request.nextUrl.searchParams);
    try {
        // return new Response("HELLO!");
        return Response.json( await transactions.get(), {status:200});
    }catch(error){
        console.log(error)
        return Response.json({message: "Internal error"}, {status: 500});
    }
}



export async function POST(request) {

    
    try {
        const data = await request.json();
        const transaction =  await transactions.add(data);
        return Response.json(data, {status: 201});
    }catch(error) {
        console.error(error);
        return Response.json({message: "Internal error"}, {status: 500});
    }
}