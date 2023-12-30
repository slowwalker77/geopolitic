'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'intersection-observer';
import { getDiscussionsByBlog } from '../lib/getDiscussionsByBlog';
import { Remarkable } from 'remarkable';
import { useMarkdown } from '../components/useMarkdown';
import BlogItem from '../components/BlogItem';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null); // 이 부분이 중요

  const lastAuthor = useRef('');
  const lastPermlink = useRef('');
  const oldPermlink = useRef('');
  const showMore = useRef(true);
  const targetRef = useRef(null);
  const blogStart = useRef(false);

  let i = 0;
  const handleIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        console.log('excute : ', (i += 1));
        loadMoreBlogs();
      }
    },
    [blogs]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.9,
      root: null,
    });
    const target = document.querySelector('.load-more-trigger');

    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect]);

  const loadMoreBlogs = async () => {
    try {
      getDiscussionsByBlog({
        tag: 'section-1',
        start_author: lastAuthor.current,
        start_permlink: lastPermlink.current,
        limit: 5,
      }).then((result) => {
        const extendLastBlog = result[result.length - 1];
        console.log(extendLastBlog.permlink);
        if (result.length > 1) {
          const resultFirstBlog = result.shift();
          if (oldPermlink.current !== extendLastBlog.permlink) {
            setBlogs((prev) => [...prev, ...result]);
            const lastBlog = result[result.length - 1];
            const { author, permlink } = lastBlog;
            lastAuthor.current = author;
            lastPermlink.current = permlink;
            showMore.current = true;
            console.log('showMore.current-final:', showMore.current);
            oldPermlink.current = permlink;
          } else {
            showMore.current = false;
            console.log('showMore.current-final:', showMore.current);
          }
        } else {
          alert('더이상의 Blog가 없습니다.');
        }
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const initialfetchBlogs = async () => {
    try {
      blogStart.current = true;
      setLoading(true);
      const result = await getDiscussionsByBlog({
        tag: 'section-1',
        limit: 5,
      });
      setBlogs(result);
      const lastBlog = result[result.length - 1];
      const { author, permlink } = lastBlog;

      lastAuthor.current = author;
      lastPermlink.current = permlink;
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
      blogStart.current = false;
    }
  };

  useEffect(() => {
    initialfetchBlogs();
  }, []);

  // const md = new Remarkable({ html: true, linkify: true });

  const toggleBlogContent = (index) => {
    // 현재 펼쳐진 게시물을 다시 클릭하면 닫고, 다른 게시물을 클릭하면 펼칩니다.
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section>

<h2 className="text-orange-800 text-xl font-extrabold ml-10 mt-5 mb-2">남북관계</h2>

      <div>
      {blogs.map((blog, index) => (
        <BlogItem
          key={index}
          blog={blog}
          isExpanded={expandedIndex === index}
          onToggle={() => toggleBlogContent(index)}
        />
      ))}
    </div>
     {/* 무한 스크롤 트리거 요소 */}
     <div className="load-more-trigger" ref={targetRef}></div>
    </section>
  );
}
