import { blogData } from "./data";
import BlogCard from "./BlogCard";

const Blog: React.FC = () => {
  return (
    <section className="flex flex-col mt-8 justify-center items-center space-y-10 mb-24 px-4 md:px-8">
      <h1 className="uppercase font-extrabold text-3xl md:text-4xl text-[#0F3952] text-center">
        Latest Blog Posts
      </h1>
      <div className="w-24 h-1 bg-[#FFD700] rounded-full mb-8"></div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 w-full max-w-7xl">
        {blogData.map((data, idx) => (
          <BlogCard
            key={idx}
            title={data.title}
            img={data.img}
            detail={data.detail}
            author={data.author}
            date={data.date}
          />
        ))}
      </div>
    </section>
  );
};

export default Blog;
