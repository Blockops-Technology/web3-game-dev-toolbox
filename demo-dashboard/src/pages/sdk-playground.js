import Layout from "@/components/common/layout/layout";
import Head from "next/head";
import { sendAssetToUser } from "sdk";
import { Button } from "@chakra-ui/react";
import { polygonMumbai } from "viem/chains";

export default function Home() {
  const metadata = {
    title: "SDK Playground - Web3 Game Dev Toolbox",
  };

  return (
    <Layout>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <div className="mt-40">
        <p>SDK Playground</p>
        <Button onClick={async () => {
          const response = await sendAssetToUser(polygonMumbai, "0xc4Ded3f875e77048466ae83967077BEDfeb1A0b0", "0x5c7e5ae9b5d3d445a2ed05151e13f8a9e3f5d4fd")
          console.log(response)
        }}>Test</Button>
      </div>
    </Layout>
  )
}
