import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "How to Find Reliable Suppliers in China",
    preview:
      "Learn practical tips and strategies for identifying trustworthy suppliers and avoiding common pitfalls in global trade.",
    thumbnail: "https://source.unsplash.com/400x250/?business,china",
  },
  {
    id: 2,
    title: "Understanding HS Codes for African Importers",
    preview:
      "A simple guide to Harmonized System (HS) codes, helping importers classify goods correctly and avoid customs delays.",
    thumbnail: "https://source.unsplash.com/400x250/?logistics,shipping",
  },
  {
    id: 3,
    title: "Top 5 Shipping Mistakes to Avoid",
    preview:
      "Discover the most common shipping mistakes businesses make and how to prevent delays, losses, or unexpected costs.",
    thumbnail: "https://source.unsplash.com/400x250/?cargo,transport",
  },
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50" id="blog">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-10">
          Latest Blog Posts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col justify-between h-full">
                <h3 className="text-xl font-medium text-black mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4">{post.preview}</p>
                <a
                  href={`/blog/${post.id}`}
                  className="text-[#f5b400] font-medium hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
