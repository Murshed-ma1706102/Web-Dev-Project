import * as analytics from "@/repos/analytics"

export async function GET(request) {
    
    try {
        const data = {
            totalUsers: await analytics.totalUsers(),
            totalSales: await analytics.totalSales(),
            totalEarning: await analytics.totalEarning(),
            bestSeller: await analytics.bestSeller()
        }
        return Response.json( data, {status:200});
    }catch(error){
        console.log(error)
        return Response.json({message: "Internal error"}, {status: 500});
    }
}