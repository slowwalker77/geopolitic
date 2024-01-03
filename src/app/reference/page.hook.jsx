'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'intersection-observer';
import { getDiscussionsByBlog } from '../lib/getDiscussionsByBlog';
import BlogItem from '../components/BlogItem';
import useQueryString from '../components/useQueryString'; // useQueryString 훅의 경로

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const lastAuthor = useRef('');
  const lastPermlink = useRef('');
  const oldPermlink = useRef('');
  const showMore = useRef(true);
  const targetRef = useRef(null);
  const blogStart = useRef(false);

  const handleIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && showMore.current) {
        loadMoreBlogs();
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.9,
      root: null,
    });
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect]);

  const loadMoreBlogs = async () => {
    try {
      const result = await getDiscussionsByBlog({
        tag: 'section-4',
        start_author: lastAuthor.current,
        start_permlink: lastPermlink.current,
        limit: 5,
      });

      if (result.length > 0) {
        setBlogs((prev) => [...prev, ...result]);
        const lastBlog = result[result.length - 1];
        lastAuthor.current = lastBlog.author;
        lastPermlink.current = lastBlog.permlink;
      } else {
        showMore.current = false;
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    loadMoreBlogs();
  }, []);

  // URL의 쿼리 스트링을 기반으로 확장 상태 결정
  const expandedQuery = useQueryString('expanded');
  useEffect(() => {
    if (expandedQuery) {
      const expandedIdx = parseInt(expandedQuery, 10);
      if (!isNaN(expandedIdx)) {
        setExpandedIndex(expandedIdx - 1); // 인덱스는 0부터 시작하므로 1을 빼줌
      }
    }
  }, [expandedQuery]);

  const toggleBlogContent = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section>
      <h2 className="text-orange-800 text-xl font-extrabold ml-10 mt-5 mb-2">참고자료</h2>
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
      {loading && <p>Loading…</p>}
      {!loading && !showMore.current && <p>더 이상 로드할 내용이 없습니다.</p>}
      {/* 무한 스크롤 트리거 요소 */}
      <div className="load-more-trigger" ref={targetRef}></div>
    </section>
  );
}
