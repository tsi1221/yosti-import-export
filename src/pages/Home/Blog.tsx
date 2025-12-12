import { blogData } from "./data";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

const Blog: React.FC = () => {
  return (
    <section className="flex flex-col mt-16 justify-center items-center mb-24 px-4 md:px-8">

      {/* Header */}
      <motion.h1
        className="uppercase font-extrabold text-3xl md:text-4xl text-yellow-400 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Latest Blog Posts
      </motion.h1>

      {/* Small underline */}
      <div className="w-24 h-1 bg-[#FFD700] rounded-full mb-12 mt-2"></div>

      {/* Blog cards grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 w-full max-w-7xl">
        {blogData.map((data, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <BlogCard
              title={data.title}
              img={data.img}
              detail={data.detail}
              author={data.author}
              date={data.date}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
