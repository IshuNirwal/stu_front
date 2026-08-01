import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import "../../css/Common.css";
import "./BlogAll.css";
import { allBlog } from "../../Utils/api";
import { Helmet } from "react-helmet";

const BlogAll = () => {
  const [blogList, setBlogList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const params = { start: "0", end: "100" };
    allBlog(params)
      .then((resp) => {
        if (resp?.data?.Status === 1) {
          setBlogList(resp.data.data || []);
        }
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogList.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogList.length / postsPerPage);

  return (
    <>
      <Helmet>
          <title>Latest Blogs on Salary Loans & Financial Tips | Salary Top Up</title>
          <meta property="og:title" content="Latest Blogs on Salary Loans & Financial Tips | Salary Top Up" />
          <meta property="og:description" content="Stay updated with expert insights, tips, and guides on instant
          salary loans, personal finance, and money management. Explore the latest blog articles from Salary Top Up." />
          <meta name="description" content="Stay updated with expert insights, tips, and guides on instant
          salary loans, personal finance, and money management. Explore the latest blog articles from Salary Top Up." />
          <link rel="canonical" href="https://salarytopup.com/blog" />
        </Helmet>
      <section className="blog-wrapper">
        <h2 className="blog-page-heading">Our Blogs</h2>

        {currentPosts.length > 0 ? (
          <div className="blog-grid">
            {currentPosts.map((item) => (
              <BlogCard key={item.id} blog={item} />
            ))}
          </div>
        ) : (
          <div className="no-blogs-message">No blogs available at the moment.</div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-nav"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              &#8592;
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="pagination-nav"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              &#8594;
            </button>
          </div>
        )}
      </section>
    </>
  );
};


export default BlogAll;