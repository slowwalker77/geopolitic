'use client';
import React from 'react';
import Image from 'next/image';
import { useMarkdown } from './useMarkdown'; // 경로 수정 필요
// 날자를 표시하는 함수
function convertToKST(dateString) {
  const date = new Date(dateString + 'Z');
  const koreaTimeOffset = 9 * 60; // 한국은 UTC+9
  date.setMinutes(date.getMinutes() + koreaTimeOffset);
  // 연월일만 표시. 시간은 제외
  return date.toLocaleDateString('ko-KR');
}

const BlogItem = ({ blog, isExpanded, onToggle }) => {
  const htmlContent = useMarkdown(blog.body);
  const formattedDate = convertToKST(blog.created); // 날짜 변환

return (
<div className="ml-8 mr-8 pb-2 pt-2">
<div className="flex space-y-4">
  {/* 제목 */}
  <h2 className="text-blue-900 text-lg md:text-xl space-y-4 lg:text-2xl font-bold">
  {blog.title}<span className="text-sm  md:text-ms lg:text-lg">({formattedDate})</span>
</h2>
</div>

      {JSON.parse(blog.json_metadata).image && (
        <div style={{ width: '100px' }}>
        <Image
          src={JSON.parse(blog.json_metadata).image[0]}
          alt="Post"
          width={500}  // 원본 이미지의 너비
          height={400}  // 원본 이미지의 높이
          layout="responsive"
        /> 
          </div>
      )}
      {isExpanded ? (
      <div
      className="space-y-4 text-ms md:text-lg lg:text-xl" // 펼쳐졌을 때의 글자 크기
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />      ) : (
<p className="text-lg md:text-base lg:text-lg" onClick={onToggle} style={{ cursor: 'pointer' }}>
          {blog.body.substring(0, 200)}...
        </p>
      )}
  {/* 버튼 */}
  <div className="flex justify-end">
    <button onClick={onToggle} className="text-orange-800 text-ms md:text-ms lg:text-ms">
      {isExpanded ? '[접기]' : '[전문]'}
    </button>
  </div>
    </div>
  );
};

export default BlogItem;
