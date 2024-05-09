"use client";
import { useState, useEffect, useRef } from "react";
import Stats from "@/components/Stats";

export default function Home() {

  const [currentUser, setUser] = useState();
  const [analytics, setAnalytics] = useState({});
  const [stale, setStale] = useState(true);

  ;
  useEffect(() => {
    if (stale) {
      fetch("/api/currentUser")
        .then((res) => res.json())
        .then((data) => {
          if(data) {
            setUser(data)
          }else {
            window.location.href = "index.html"
          }
        });
      fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
      })
      // .catch((e) => {})
      // .finally(() => {});
      setStale(false);
    }
    return () => {};
  }, [stale]);

  async function logout() {

    const response = await fetch("/api/currentUser", {
      method: "PUT",
      body: JSON.stringify({userId: currentUser.userId ,login: false, type: currentUser.type})
    });
    if(response.ok) {
      setStale(true);
    }
  }
  return (
    <>
    <header>
        <div>
          <h1>Easy-Shop</h1>
          <p>“Fashion Finds Delivered to Your Doorstep.”</p>
        </div>
        <nav className="">
            <button onClick={logout}>Log out</button>
        </nav>
    </header>
    <main>
        
        <Stats analytics = {analytics}/>
        
    </main>
    </>
  );
}
