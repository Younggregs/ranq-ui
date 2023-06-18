"use client";
import * as React from "react";
import Landing from "./landing";
import Index from "./index";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <>
      {isLoggedIn ? <Index /> : <Landing />}
    </>
  )
}
