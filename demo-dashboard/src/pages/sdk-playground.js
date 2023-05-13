import Layout from "@/components/common/layout/layout";
import Head from "next/head";
import VerifyAccessFunctionality from "@/components/sdkPlayground/verifyAccessFunctionality/verifyAccessFunctionality";
import MintTokenFunctionality from "@/components/sdkPlayground/mintTokenFunctionality/mintTokenFunctionality";
import VerifyApeHolderFunctionality
  from "@/components/sdkPlayground/verifyApeHolderFunctionality/verifyApeHolderFunctionality";
import SendApeHolderFunctionality
  from "@/components/sdkPlayground/sendApeHolderFunctionality/sendApeHolderFunctionality";

export default function Home() {
  const metadata = {
    title: "SDK Playground - Web3 Game Dev Toolbox",
  };

  return (
    <Layout>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <div className="mt-40 max-w-[600px] m-auto">
        <p>SDK Playground</p>
        <div className="mt-10" />
        <MintTokenFunctionality />
        <VerifyAccessFunctionality />
        <VerifyApeHolderFunctionality />
        <SendApeHolderFunctionality />
      </div>
    </Layout>
  )
}
