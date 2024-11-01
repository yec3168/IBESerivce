INSERT INTO `member` (
    entry_date, member_name, member_point, update_date, member_nick_name, member_addr, member_addr_detail,
    member_auth_number, member_email, member_password, member_phone, role
) VALUES
      (NOW(), '홍길동', 100, NOW(), '홍닉', '서울특별시 강남구', NULL, '123456', 'hong@example.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', '010-1234-5678', 'ROLE_CLIENT'),
      (NOW(), '김철수', 150, NOW(), '김닉', '부산광역시 해운대구', NULL, '654321', 'kim@example.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', '010-9876-5432', 'ROLE_CLIENT'),
      (NOW(), '이영희', 200, NOW(), '이닉', '대구광역시 중구', NULL, '111222', 'lee@example.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', '010-1122-3344', 'ROLE_ADMIN'),
      (NOW(), '박준형', 250, NOW(), '박닉', '인천광역시 부평구', NULL, '333444', 'park@example.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', '010-2233-4455', 'ROLE_DEFAULT'),
      (NOW(), '최지현', 300, NOW(), '최닉', '광주광역시 북구', NULL, '555666', 'choi@example.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', '010-3344-5566', 'ROLE_CLIENT'),
      (NOW(), '강민수', 350, NOW(), '강닉', '울산광역시 남구', NULL, '777888', 'kang@example.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', '010-4455-6677', 'ROLE_CLIENT'),
      (NOW(), '이수빈', 400, NOW(), '이닉2', '세종특별자치시', NULL, '999000', 'lee2@example.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', '010-5566-7788', 'ROLE_ADMIN'),
      (NOW(), '김하늘', 450, NOW(), '김닉2', '경기도 수원시', NULL, '123123', 'kim2@example.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', '010-6677-8899', 'ROLE_DEFAULT'),
      (NOW(), '오민정', 500, NOW(), '오닉', '전라북도 전주', NULL, '456456', 'oh@example.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', '010-7788-9900', 'ROLE_CLIENT'),
      (NOW(), '이동욱', 550, NOW(), '이닉3', '충청남도 천안', NULL, '789789', 'lee3@example.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', '010-8899-0011', 'ROLE_CLIENT'),
      (NOW(), '변서영', 550, NOW(), '서영', '충청남도 천안', NULL, '789789', 'fhbsy84@gmail.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', '010-9316-5134', 'ROLE_CLIENT');
INSERT INTO member_bank (member_id, member_account_number, member_bank) VALUES
    (1, '123-456-7890', 'HANA'),
    (2, '234-567-8901', 'KAKAO'),
    (3, '345-678-9012', 'KB'),
    (4, '456-789-0123', 'NH'),
    (5, '567-890-1234', 'SHINHAN'),
    (6, '678-901-2345', 'TOSS'),
    (7, '789-012-3456', 'WOORI'),
    (8, '890-123-4567', 'HANA'),
    (9, '901-234-5678', 'KAKAO'),
    (10, '012-345-6789', 'KB'),
    (11, '012-345-6780', 'HANA');