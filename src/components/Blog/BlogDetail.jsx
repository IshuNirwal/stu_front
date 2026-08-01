import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from 'react-router-dom';
import "../../css/Common.css";
import { blogDetail } from "../../Utils/api";
import "./BlogDetail.css";
import urls from "../../Utils/urls";


const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog]=useState([])
  useEffect(()=>{
    const params={
      "blog_slug": id
    };


    blogDetail(params).then(resp =>{
      if (resp?.data?.Status ===1){
        const blogDetail=resp?.data.data[0] || {};
        setBlog(blogDetail);
      }
    })
  },[])

  const cleanedFilename = blog.banner_image_url?.replace(/^DIRECT_DOC_URL/, "");
  const fullImageUrl = urls.BASE_IMAGE_URL + cleanedFilename;

  const canonicalUrl = `https://salarytopup.com/blog/${id}`;

  return (
    <>
      <Helmet>
        <title>{blog.title ? `${blog.title} | SalaryTopUp Blog` : "SalaryTopUp Blog"}</title>
        {blog.short_description && (
          <meta name="description" content={blog.short_description} />
        )}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        {blog.title && <meta property="og:title" content={blog.title} />}
        {blog.short_description && (
          <meta property="og:description" content={blog.short_description} />
        )}
        {cleanedFilename && <meta property="og:image" content={fullImageUrl} />}
      </Helmet>

      <div className="content_page_wrapper">
        <Link to="/blog" className="blog-back-link">← Back to Blogs</Link>

        <div className="">
          <div className="">
            <div className="text_content">
              <div className="content_banner">
                <img
                  src={fullImageUrl}
                  alt={blog.banner_image_alt || blog.title || "Blog banner"}
                />
                {blog.banner_image_caption && (
                  <p className="content_banner_caption">{blog.banner_image_caption}</p>
                )}
              </div>
              <h1>{blog.title}</h1>
              <p>{blog.created_date}</p>
              <p>
                {blog.short_description}
              </p>
              <div
                className="blog-html-content"
                dangerouslySetInnerHTML={{ __html: blog.long_description }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* <ChatButton /> */}
    </>
  );
};

export default BlogDetail;
