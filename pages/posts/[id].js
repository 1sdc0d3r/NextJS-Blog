import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log("[id] getStaticProps", { params });

  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  console.log({ postData });
  const { title, id, date, contentHtml } = postData;
  return (
    <>
      <Layout>
        <Head>
          <title>{title}</title>
        </Head>
        {title}
        <br />
        {id}
        <br />
        {/* {date} */}
        <Date dateString={date} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
      </Layout>
    </>
  );
}
