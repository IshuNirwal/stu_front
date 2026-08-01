import React from "react";
import { Link } from "react-router-dom";
import "../Blog/BlogCard.css";
import urls from "../../Utils/urls";

const BlogCard = ({ blog }) => {
    if (!blog) return null;

    const cleanedFilename = blog.thumb_image_url.replace(/^DIRECT_DOC_URL/, "");
    const fullImageUrl = urls.BASE_IMAGE_URL + cleanedFilename;

    return (
        <>
            <Link to={`/blog/${blog.slug}`} className="card">
                <div className="card-image-wrapper">
                    <img
                        src={fullImageUrl || "https://via.placeholder.com/300x200"}
                        alt={blog.thumb_image_alt || "Blog Image"}
                        className="card-image"
                    />
                    {blog.created_date && (
                        <span className="card-date">{blog.created_date}</span>
                    )}
                </div>
                {blog.thumb_image_caption && (
                    <p className="card-image-caption">{blog.thumb_image_caption}</p>
                )}
                <div className="card-content">
                    <h2 className="card-heading">{blog.title}</h2>
                    <p className="card-description">{blog.short_description}</p>
                    <span className="read-more-link">Read More</span>
                </div>
            </Link>
        </>
    );
};

export default BlogCard;
