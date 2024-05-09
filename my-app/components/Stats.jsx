"use client";
import { LucideShoppingCart, LucideDollarSign } from "lucide-react";
import { useState, useEffect, useRef } from "react";
export default function Stats(analytics) {
    
    const [bestSellerItem, setBestSeller] = useState();
    let totalUsers;
    let buyers;
    let sellers;
    let totalSales;
    let totalEarning;
    let bestSellerSoldQuantity;
    let bestSellerImg;
    
  
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
            

          </section>
          <section>
            <h2>Top 3 Sellers</h2>
            

          </section>
            
       </>
    );
}