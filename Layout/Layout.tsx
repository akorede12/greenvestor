import React from "react";
import Head from "next/head";
import { ReactComponentElement } from "react";

export default function AppLayout({
  children,
}: {
  children: ReactComponentElement<any>;
}) {
  return (
    <div>
      {" "}
      <div>
        <Head>
          <link rel="icon" href="/favicon/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="" />
          <meta name="keywords" content=""></meta>
        </Head>
        <main className={` pt-10 md:pt-14`}>{children}</main>
      </div>
    </div>
  );
}
