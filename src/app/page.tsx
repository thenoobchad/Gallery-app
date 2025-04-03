import Link from "next/link";
import { db } from "~/server/db";

const mockUrl = [
  "https://h586u9zkym.ufs.sh/f/2MmocCqOnbsomxDIYhesVOnTEp56lKoWYZGyRNIw0Xcqz4fu",
  "https://h586u9zkym.ufs.sh/f/2MmocCqOnbsooXRsLcPkrC1UGoB4LIJwKPznduWylFevXfRp",
  "https://h586u9zkym.ufs.sh/f/2MmocCqOnbsocJSxGbL3K0LaNUpwIGRQmyl4qbxYgEdvHVS7",
  "https://h586u9zkym.ufs.sh/f/2MmocCqOnbsoqgtmAVlZOABJzo7w0NeSmPpUxhl6vsVRiQd3",
  "https://h586u9zkym.ufs.sh/f/2MmocCqOnbsoN9EUUaEjXvL7BJS80WK6FlAUpjIuxmfekYVN",
];

const mockImages = mockUrl.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="images" />
          </div>
        ))}
      </div>
    </main>
  );
}
