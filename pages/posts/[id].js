import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";

export async function getStaticPaths() {
  const paths = getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const postData = await getPostData(id);
  return { props: { postData } };
}

export default function Post({ postData: { title, id, date, contentHtml } }) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Date dateString={date} />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
    </Layout>
  );
}
