import Layout from "@/components/common/layout/layout";
import Head from "next/head";
import Form from "@/components/create-project/form/form";

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
      </div>
    </Layout>
  )
}
