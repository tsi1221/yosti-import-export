import { CalendarFilled, RightOutlined, UserOutlined } from "@ant-design/icons"
import { Button } from "antd"


type BlogCardProps={
    img:string,
    title:string,
    detail:string,
    author:string,
    date:Date
}

function BlogCard({img,title,detail,author,date}:BlogCardProps) {
  return (
    <>
    <div className=" shadow-md rounded-md bg-white md:w-[350px] w-full ">
        <div className="h-[300px] w-full">
            <img src={img} alt=""  className="w-full h-full object-cover"/>
        </div>
        <div className=" space-y-3 m-5">
            <h1 className="uppercase font-medium text-xl">{title}</h1>
            <div className="flex text-neutral-500 gap-4">
                <p className="space-x-1"><CalendarFilled /> <span>{date.toLocaleDateString()}</span></p>
                <p className="space-x-1"><UserOutlined/> <span>{author}</span></p>
            </div>
            <p>{detail}</p>
        <Button  className="border-[#0021f59e] text-[#0021f59e]"> READ MORE <span><RightOutlined /></span></Button>
        </div>
    </div>
    </>
  )
}

export default BlogCard