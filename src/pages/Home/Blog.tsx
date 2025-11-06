
import { blogData } from "./data";
import BlogCard from "./BlogCard";

function Blog() {
  return (
    <div className="flex flex-col mt-8 justify-center items-center space-y-10 mb-24">
        <h1 className=" uppercase font-medium text-2xl">Latest Blogs Post</h1>
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {blogData.map((data)=>(

        <BlogCard title={data.title} img={data.img} detail={data.detail} author={data.author} date={data.date} />
        ))}
        </div>
        </div>
  )
}

export default Blog