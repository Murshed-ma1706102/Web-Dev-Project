"use client";
import { LucideShoppingCart, LucideDollarSign } from "lucide-react";

export default function Stats(analytics) {
    
    let totalUsers;
    let buyers;
    let sellers;
    let totalSales;
    let totalEarning;
    let bestSellerSoldQuantity;
    let bestSellerImg;
    let top3Buyers;
    let top3Sellers;
  
    try {
      if(analytics.analytics.totalUsers) {
        buyers = analytics.analytics.totalUsers.buyers;
        sellers = analytics.analytics.totalUsers.sellers;
        totalUsers = buyers + sellers;
        totalSales = analytics.analytics.totalSales._sum.quantity;
        totalEarning = analytics.analytics.totalEarning._sum.totalPrice;
    }
      if(analytics.analytics.bestSeller) {
        bestSellerSoldQuantity = analytics.analytics.bestSeller[0]._sum.quantity;
        bestSellerImg = analytics.analytics.bestSeller[0].src;
      }
      if(analytics.analytics.top3Buyers) {
        top3Buyers = analytics.analytics.top3Buyers;
        top3Sellers = analytics.analytics.top3Sellers;
      }
    }catch(e) {

    }

    
    return (
      <>
        <div className="stats shadow">
  
             <div className="stat place-items-center">
               <div className="stat-title">Total Sales</div>
               <div className="stat-value">{totalSales ? totalSales: 0}</div>
               <div className="stat-desc"><LucideShoppingCart/></div>
             </div>
  
             <div className="stat place-items-center">
               <div className="stat-title">Users</div>
               <div className="stat-value text-secondary">{totalUsers}</div>
               <div className="stat-desc text-secondary">buyers: {buyers}, sellers: {sellers}</div>
             </div>
  
             <div className="stat place-items-center">
               <div className="stat-title">Total Earnings</div>
               <div className="stat-value">{totalEarning ? totalEarning: 0}</div>
               <div className="stat-desc"><LucideDollarSign/></div>
             </div>
  
          </div>
          <section>
              <h2>Best Seller</h2>
              {bestSellerSoldQuantity ? <div className="w-[310px] h-[320px] m-auto card w-96 bg-base-100 shadow-xl">
                <figure className="px-5 pt-5">
                  <img src= {bestSellerImg} alt="" className="rounded-xl h-[190px] w-[190px]" />
                </figure>
                <div className="pb-3 px-5 card-body items-center text-center">
                  <h2 className="card-title mb-[1em]">quantity sold: {bestSellerSoldQuantity}</h2>
                </div>
              </div>: ""}
          </section>
          <section>
            <h2>Top 3 Buyers</h2>
            <div className="grid grid-cols-[auto_auto_auto]">
              {top3Buyers ? top3Buyers[1] ?
               <div className="w-[260px] h-[280px] m-auto card w-96 bg-base-100 shadow-xl">
               <figure className="px-5 pt-5">
                 <img src= {"./media/avatars/avatar2.svg"} alt="" className="rounded-xl h-[150px] w-[190px]" />
               </figure>
               <div className="pb-3 px-5 card-body items-center text-center">
                 <h2 className="mb-0 text-xl" >ID:{top3Buyers[1].buyerId}</h2>
                 <h2 className="mb-0 text-xl" >#Top 2</h2>
                 <h2 className="card-title mb-[1em] text-lg">total purchases: {top3Buyers[1]._sum.totalPrice}<LucideDollarSign/></h2>
               </div>
             </div>
                : "":""}
              
              {top3Buyers ? top3Buyers[0] ?
               <div className="w-[260px] h-[280px] m-auto card w-96 bg-base-100 shadow-xl">
               <figure className="px-5 pt-5">
                 <img src= {"./media/avatars/avatar1.svg"} alt="" className="rounded-xl h-[150px] w-[190px]" />
               </figure>
               <div className="pb-3 px-5 card-body items-center text-center">
                 <h2 className="mb-0 text-xl" >ID:{top3Buyers[0].buyerId}</h2>
                 <h2 className="mb-0 text-xl" >#Top 1</h2>
                 <h2 className="card-title mb-[1em] text-lg">total purchases: {top3Buyers[0]._sum.totalPrice}<LucideDollarSign/></h2>
               </div>
             </div>
                : "":""}
              
                {top3Buyers ? top3Buyers[2] ?
               <div className="w-[260px] h-[280px] m-auto card w-96 bg-base-100 shadow-xl">
               <figure className="px-5 pt-5">
                 <img src= {"./media/avatars/avatar3.svg"} alt="" className="rounded-xl h-[150px] w-[190px]" />
               </figure>
               <div className="pb-3 px-5 card-body items-center text-center">
                 <h2 className="mb-0 text-xl" >ID:{top3Buyers[2].buyerId}</h2>
                 <h2 className="mb-0 text-xl" >#Top 3</h2>
                 <h2 className="card-title mb-[1em] text-lg">total purchases: {top3Buyers[2]._sum.totalPrice}<LucideDollarSign/></h2>
               </div>
             </div>
                : "":""}
            
            </div>
          </section>
          <section>
            <h2>Top 3 Sellers</h2>
            <div className="grid grid-cols-[auto_auto_auto]">
              {top3Sellers ? top3Sellers[1] ?
               <div className="w-[260px] h-[280px] m-auto card w-96 bg-base-100 shadow-xl">
               <figure className="px-5 pt-5">
                 <img src= {"./media/avatars/avatar4.svg"} alt="" className="rounded-xl h-[150px] w-[190px]" />
               </figure>
               <div className="pb-3 px-5 card-body items-center text-center">
                 <h2 className="mb-0 text-xl" >ID:{top3Sellers[1].sellerId}</h2>
                 <h2 className="mb-0 text-xl" >#Top 2</h2>
                 <h2 className="card-title mb-[1em] text-lg">num of sold items: {top3Sellers[1]._sum.quantity}</h2>
               </div>
             </div>
                : "":""}
              
              {top3Sellers ? top3Sellers[0] ?
               <div className="w-[260px] h-[280px] m-auto card w-96 bg-base-100 shadow-xl">
               <figure className="px-5 pt-5">
                 <img src= {"./media/avatars/avatar5.svg"} alt="" className="rounded-xl h-[150px] w-[190px]" />
               </figure>
               <div className="pb-3 px-5 card-body items-center text-center">
                 <h2 className="mb-0 text-xl" >ID:{top3Sellers[0].sellerId}</h2>
                 <h2 className="mb-0 text-xl" >#Top 1</h2>
                 <h2 className="card-title mb-[1em] text-lg">num of sold items: {top3Sellers[0]._sum.quantity}</h2>
               </div>
             </div>
                : "":""}
              
                {top3Sellers ? top3Sellers[2] ?
               <div className="w-[260px] h-[280px] m-auto card w-96 bg-base-100 shadow-xl">
               <figure className="px-5 pt-5">
                 <img src= {"./media/avatars/avatar6.svg"} alt="" className="rounded-xl h-[150px] w-[190px]" />
               </figure>
               <div className="pb-3 px-5 card-body items-center text-center">
                 <h2 className="mb-0 text-xl" >ID:{top3Sellers[2].sellerId}</h2>
                 <h2 className="mb-0 text-xl" >#Top 3</h2>
                 <h2 className="card-title mb-[1em] text-lg">num of sold items: {top3Sellers[2]._sum.quantity}</h2>
               </div>
             </div>
                : "":""}
            
            </div>

          </section>
            
       </>
    );
}