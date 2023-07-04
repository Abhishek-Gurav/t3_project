import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "~/components/Layout";

const Face = dynamic(() => import("../components/Facemask"), {ssr: false});

export default function Facemask() {
    return (
        <Layout>
        <Face />
        </Layout>
    );
}