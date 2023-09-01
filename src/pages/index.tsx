/* eslint-disable @next/next/no-img-element */
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import client from "~/utils/apollo-client";

export default function Home({ posts }: { posts: any[] }) {
  return (
    <>
      <main className={`flex min-h-screen flex-col `}>
        <div className="text-center py-12 px-4 bg-gray-800">
          <h1 className="text-gray-100 font-semibold text-2xl mb-2 ">
            Welcome To My Mini Blog
          </h1>
          <p className="text-gray-100 text-md">
            {/* All my thought, insight, knowledge and ideas are nicely written here */}
            Unveiling My Mind&apos;s Mosaic. A Personal Chronicle of Thoughts,
            Insights, and Ideas. Authentically.
          </p>
        </div>
        <div>
          <div className="max-w-screen-lg mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-5 p-5 ">
            {posts.map((post) => (
              <article
                key={post.postId}
                className="border shadow-md border-sky-100 mb-2 bg-white rounded-md hover:shadow-xl cursor-pointer duration-300 hover:-translate-y-1"
              >
                <a href={`/${post.slug}`} className="flex flex-col h-full">
                  <div>
                    <img
                      className="rounded-t-md"
                      loading="eager"
                      alt=""
                      src="https://images.unsplash.com/photo-1687186735445-df877226fae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8YWxsfDV8fHx8fHwyfHwxNjg3MzIzNjU5fA&ixlib=rb-4.0.3&q=80&w=2000"
                    />
                  </div>

                  <div className="p-4 flex flex-col h-full">
                    <span className="text-sm font-medium text-sky-800">
                      Category
                    </span>
                    <div className="flex flex-col justify-between flex-grow">
                      <h2 className="text-lg font-medium">{post.title}</h2>
                      <div className="flex items-center pt-3 text-sm text-gray-600">
                        <span>2 Bulan lalu</span>
                        <span> - </span>
                        <span>1 menit baca</span>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
      <footer className="text-center py-10 bg-gray-800 flex flex-col gap-2">
        <p className="text-white">Anshor Mini Blog © 2023</p>
        <p className="text-white">Twitter Logo, vervel logo, github anshor</p>
        <p className="text-white">
          Built with NextJS, Wordpress GraphiQL, and TailwindCSS
        </p>
      </footer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const getLast10PostsQuery = gql`
    query {
      posts(last: 10) {
        nodes {
          slug
          title
          postId
          content
        }
      }
    }
  `;

  let posts: any[] = [];
  try {
    const { data } = await client.query({
      query: getLast10PostsQuery,
    });

    posts = data.posts.nodes;
  } catch (error) {
    posts = [];
  }

  return { props: { posts } };
};
