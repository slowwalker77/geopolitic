'use client';
import React, { useState, useCallback } from 'react';
import classNames from 'classnames';


const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);

    // useCallback을 사용하여 함수를 메모이제이션합니다.
    const toggleMenu = useCallback(() => {
      setMenuToggle(prevMenuToggle => !prevMenuToggle);
    }, []); // 의존성 배열은 이 경우 비어있습니다.



  return (
    <nav className="bg-gray-200">
      <div className="max-w-6xl mx-auto px-4 border">
        <div className="flex justify-between">
          {/* 메뉴 */}
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <a href="/" className="flex items-center py-3 px-5 text-gray-700">
                <span className="text-2xl font-bold">지정학과 세상읽기</span>
              </a>
            </div>
            <div className="hidden text-xl font-bold text-green-800 md:flex items-center space-x-1">
              <a
                href="/internal"
                className="py-5 px-3  hover:text-orange-600 "
              >
                국내정치
              </a>
              <a
                href="/interkorea"
                className="py-5 px-3  hover:text-orange-700"
              >
                남북관계
              </a>
              <a
                href="/international"
                className="py-5 px-3 hover:text-orange-700"
              >
                국제정치
              </a>
              <a
                href="regionalconflicts"
                className="py-5 px-3 hover:text-orange-700"
              >
                지역분쟁
              </a>
              <a
                href="/reference"
                className="py-5 px-3 hover:text-orange-700"
              >
                참고자료
              </a>
            </div>
          </div>

          {/* 메뉴2 */}
          <div className="md:hidden flex items-center space-x-1">
          <button onClick={toggleMenu}>
              {menuToggle ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  dataSlot="icon"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  dataSlot="icon"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'md:hidden', 
          'flex', 
          'justify-center',
          'text-green-800',
          'font-bold',
          'text-lg',
           {
          hidden: !menuToggle,
        })}
      >
        <a href="/internal" className="py-1 px-3 hover:text-orange-900">
          국내정치
        </a>
        <a href="/interkorea" className="py-1 px-3 hover:text-orange-900">
          남북관계
        </a>
        <a href="/international" className="py-1 px-3 hover:text-orange-900">
          국제정치
        </a>
        <a href="/regionalconflicts" className="py-1 px-2 hover:text-orange-900">
          지역분쟁
        </a>
        <a href="/reference" className="py-1 px-3 hover:text-orange-900">
          참고자료
        </a>
      </div>
    </nav>
  );
};

export default Navbar;