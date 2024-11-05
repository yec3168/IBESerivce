import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminInquiryList.css';

const AdminInquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [answers, setAnswers] = useState({}); // 각 문의의 답변을 저장할 상태

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/admin/inquiry/answeredlist'
      );
      const fetchedInquiries = response.data.map((inquiry) => ({
        id: inquiry.inquiryId,
        category: inquiry.inquiryCategory,
        title: inquiry.inquiryTitle,
        content: inquiry.inquiryContent,
        nickname: inquiry.memberNickName,
        date: new Date(inquiry.inquiryCreatedAt).toLocaleDateString(),
      }));
      setInquiries(fetchedInquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      alert('문의 목록을 불러오는 데 실패했습니다.');
    }
  };

  const fetchAnswer = async (inquiryId) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/admin/inquiry/getinquiryanswer',
        {
          inquiryId: inquiryId,
        }
      );
      const { inquiryAnswerContent, inquiryAnswerCreatedAt } = response.data;
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [inquiryId]: {
          responseContent: inquiryAnswerContent.replace(/\n/g, '<br />'), // 개행문자 변환
          responseDate: new Date(inquiryAnswerCreatedAt).toLocaleDateString(),
        },
      }));
    } catch (error) {
      console.error('Error fetching answer:', error);
      alert('답변을 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const sortedInquiries = [...inquiries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      if (!answers[id]) {
        fetchAnswer(id); // 답변이 아직 로드되지 않은 경우에만 fetchAnswer 호출
      }
    }
  };

  return (
    <>
      <h2>처리된 문의 목록</h2>
      <div className="admin-il-inquiry-list-container">
        <div className="admin-il-inquiry-list-column">
          <div className="admin-il-column admin-il-id">ID</div>
          <div className="admin-il-column admin-il-category">카테고리</div>
          <div className="admin-il-column admin-il-title">제목</div>
          <div className="admin-il-column admin-il-nickname">닉네임</div>
          <div className="admin-il-column admin-il-date">신청일</div>
        </div>
        <div className="admin-il-inquiry-list">
          {sortedInquiries.map((inquiry) => (
            <div key={inquiry.id} className="admin-il-inquiry-list-item">
              <div
                className="admin-il-inquiry-list-header"
                onClick={() => toggleExpand(inquiry.id)}
              >
                <div className="admin-il-column admin-il-id">{inquiry.id}</div>
                <div className="admin-il-column admin-il-category">
                  {inquiry.category}
                </div>
                <div className="admin-il-column admin-il-title">
                  {inquiry.title}
                </div>
                <div className="admin-il-column admin-il-nickname">
                  {inquiry.nickname}
                </div>
                <div className="admin-il-column admin-il-date">
                  {inquiry.date}
                </div>
              </div>
              {expandedId === inquiry.id && (
                <div className="admin-il-inquiry-list-content">
                  <p>{inquiry.content}</p>
                  {answers[inquiry.id] ? (
                    <>
                      <p>
                        <strong>답변일:</strong>{' '}
                        {answers[inquiry.id].responseDate}
                      </p>
                      <p>
                        <strong>답변 내용</strong>
                        <br />{' '}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: answers[inquiry.id].responseContent,
                          }}
                        />
                      </p>
                    </>
                  ) : (
                    <p>답변을 불러오는 중입니다...</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminInquiryList;
