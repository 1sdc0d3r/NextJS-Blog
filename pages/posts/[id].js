import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log("[id] getStaticProps", { params });

  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  console.log({ postData });
  const { title, id, date } = postData;
  return (
    <>
      <Layout>
        {title}
        <br />
        {id}
        <br />
        {date}
      </Layout>
    </>
  );
}
