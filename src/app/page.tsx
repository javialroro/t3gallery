import { db } from "~/server/db";


export const dynamic = "force-dynamic";

const mockUrls = [
  "https://cde58ssrg5.ufs.sh/f/K11RarIgZR4ni3eCEJkpbcm8AJUxNBL47wjPnGlofytrCFV1",
  "https://cde58ssrg5.ufs.sh/f/K11RarIgZR4nZYwBZPp537QzKqnGY0dRXTgscDBrk8VlPmyE",
  "https://cde58ssrg5.ufs.sh/f/K11RarIgZR4nAlO8qs1mXKJeCySigoTB0tsZEI5fG634VdMz",
  "https://cde58ssrg5.ufs.sh/f/K11RarIgZR4n38jOVOPS61B9Zmi8ohdDr5lXKvxSTgPAMLGs"
]

const mockImages = mockUrls.map((url, index) => (
  {id: index + 1, 
    url
  }))
export default async function HomePage() {

  const posts= await db.query.posts.findMany()

  console.log(posts)

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {
          posts.map((post, index) => (
            <div key={post.id}>{post.name}</div>
          ))
              
        }

      {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} alt="image" className="w-full" />
          </div>
        ))
      }
      </div>
    </main>
  );
}
