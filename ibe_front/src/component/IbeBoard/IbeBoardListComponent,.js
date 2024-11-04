import React, { useState, useEffect } from "react";
import { Table, Button, Pagination, Container, Row, Col } from "react-bootstrap";
import "./Board.css";

const IbeBoardListComponent = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Set up mock data for testing
    useEffect(() => {
        const mockData = [
            { id: 1, category: "공지", title: "공지사항 - 리액트 프로젝트 시작 안내", author: "관리자", date: "2023-11-04", views: 150, comments: 5 },
            { id: 2, category: "문의", title: "일반 게시글", author: "작성자 1", date: "2024-11-04", views: 35, comments: 2 },
            { id: 3, category: "신고", title: "일반 게시글", author: "작성자 2", date: "2024-11-04", views: 42, comments: 0 },
            { id: 4, category: "문의", title: "일반 게시글", author: "작성자 3", date: "2024-11-04", views: 56, comments: 3 },
            { id: 5, category: "기타", title: "일반 게시글", author: "작성자 4", date: "2024-11-03", views: 78, comments: 1 },
            { id: 6, category: "기타", title: "일반 게시글", author: "작성자 5", date: "2023-11-04", views: 89, comments: 0 },
            { id: 7, category: "기타", title: "일반 게시글", author: "작성자 6", date: "2023-11-03", views: 55, comments: 0 },
            { id: 8, category: "기타", title: "일반 게시글", author: "작성자 7", date: "2023-10-30", views: 40, comments: 0 },
            // Add more mock posts here as needed
        ];

        // Sort posts by date descending
        const sortedPosts = mockData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sortedPosts);
    }, []);

    // Utility to check if a post is new (posted today)
    const isToday = (dateString) => {
        const postDate = new Date(dateString);
        const today = new Date();
        return (
            postDate.getDate() === today.getDate() &&
            postDate.getMonth() === today.getMonth() &&
            postDate.getFullYear() === today.getFullYear()
        );
    };

    // Pagination calculations
    const startIndex = (currentPage - 1) * itemsPerPage;
    const normalPosts = posts.filter(post => post.category !== "공지"); // Regular posts
    const paginatedPosts = normalPosts.slice(startIndex, startIndex + itemsPerPage);

    // Handle pagination click
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Get all 공지 posts to display them on top
    const noticePosts = posts.filter(post => post.category === "공지");

    return (
        <div id="board_content">
            <Container className="board-container">
                <Row>
                    <Col className="mb-4">
                        <p className="h2 board-title">아이비 게시판</p>
                    </Col>
                </Row>
                <Table hover className="board-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>날짜</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Display 공지 posts */}
                        {noticePosts.map((post) => (
                            <tr key={post.id}>
                                <td style={{ fontWeight: 'bold' }}></td> {/* No ID displayed */}
                                <td>
                                    <span className={`category-${post.category}`}>{post.category}&emsp;</span> 
                                    <strong>{post.title}</strong> 
                                    {post.comments !== 0 && <span className="comment-count" style={{color:"blue", fontWeight:"700"}}> {post.comments}</span>}
                                    {isToday(post.date) && <span className="new-tag">New</span>} 

                                </td>
                                <td><strong>{post.author}</strong></td>
                                <td><strong>{post.date}</strong></td>
                                <td><strong>{post.views}</strong></td>
                            </tr>
                        ))}
                        {/* Display paginated normal posts */}
                        {paginatedPosts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td> {/* ID displayed for normal posts */}
                                <td>
                                    <span className={`category-${post.category}`}>{post.category}&emsp;</span> 
                                    {post.title} 
                                    {post.comments !== 0 && <span className="comment-count" style={{color:"blue", fontWeight:"700"}}> {post.comments}</span>}
                                    {isToday(post.date) && <span className="new-tag">New</span>} 
                                </td>
                                <td>{post.author}</td>
                                <td>{post.date}</td>
                                <td>{post.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="text-end">
                    <Button className="add-post-btn">글쓰기</Button>
                </div>
                <Pagination className="justify-content-center">
                    {[...Array(Math.ceil(normalPosts.length / itemsPerPage)).keys()].map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Container>
        </div>
    );
};

export default IbeBoardListComponent;
