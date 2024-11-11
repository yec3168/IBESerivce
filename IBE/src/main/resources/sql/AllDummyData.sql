INSERT INTO `member` (`member_deleted`, `entry_date`, `member_name`, `member_nick_name`, `member_point`, `update_date`, `member_phone`, `member_addr`, `member_addr_detail`, `member_auth_number`, `member_email`, `member_password`, `member_social_id`, `member_social_type`, `role`) VALUES
(0, '2024-01-01 10:00:00', '홍길동', '길동이', 1000, '2024-01-01 10:00:00', '01012345678', '서울 강남구 가로수길 13', '202동 103호', '123456', 'hong@naver.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', NULL, 'LOCAL', 'ROLE_CLIENT'),
(0, '2024-01-02 10:30:00', '김유진', '유진', 2000, '2024-01-02 10:30:00', '01023456789', '서울 송파구 가락로 12', '1102동 1101호', '654321', 'kim@naver.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', NULL, 'LOCAL', 'ROLE_ADMIN'),
(0, '2024-01-03 11:00:00', '이철수', '철수', 1500, '2024-01-03 11:00:00', '01034567890', '서울 마포구 독막로 172', '301동 502호', '987654', 'lee@naver.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', NULL, 'LOCAL', 'ROLE_CLIENT'),
(0, '2024-01-04 12:00:00', '박지수', '지수', 1200, '2024-01-04 12:00:00', '01045678901', '서울 용산구 다산로 8-11', '904동 101호', '135792', 'park@naver.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', NULL, 'LOCAL', 'ROLE_CLIENT'),
(0, '2024-01-05 13:00:00', '최명훈', '명훈', 1800, '2024-01-05 13:00:00', '01056789012', '서울 종로구 삼봉로 100-1', '406동 301호', '246801', 'choi@naver.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', NULL, 'LOCAL', 'ROLE_SERVICE_MANAGER'),
(0, '2024-01-06 14:00:00', '장민경', '민경', 1100, '2024-01-06 14:00:00', '01067890123', '서울 성북구 도봉로 7', '102동 101호', '369258', 'jang@naver.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', NULL, 'LOCAL', 'ROLE_CLIENT'),
(0, '2024-01-07 15:00:00', '오세훈', '세훈', 900, '2024-01-07 15:00:00', '01078901234', '서울 중구 다동길 5', '507동 1001호', '111213', 'oh@naver.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', NULL, 'LOCAL', 'ROLE_CLIENT'),
(0, '2024-01-08 16:00:00', '김동우', '동우', 2500, '2024-01-08 16:00:00', '01089012345', '서울 강서구 개화길 4', '603동 203호', '141516', 'kimd@naver.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', NULL, 'LOCAL', 'ROLE_ADMIN'),
(0, '2024-01-09 17:00:00', '이주현', '주현', 2200, '2024-01-09 17:00:00', '01090123456', '서울 강북구 도선사길 236', '705동 1201호', '171819', 'leej@naver.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', NULL, 'LOCAL', 'ROLE_CLIENT'),
(0, '2024-01-10 18:00:00', '배수지', '수지', 2000, '2024-01-10 18:00:00', '01012346789', '서울 동대문구 서울시립대로3길 10', '808동 503호', '202122', 'bae@naver.com', '$2b$12$hjCeA7fgEdGNV5z8TbE0NenK8P95c02io97xYVxJAwbjfdMYg8VDi', NULL, 'LOCAL', 'ROLE_BOARD_MANAGER');

INSERT INTO `member_bank` (`member_id`, `member_account_number`, `member_bank`) VALUES
(1, '3020000011702', 'NH'),
(2, '1000003188002', 'KDB'),
(3, '3456789012', 'KB'),
(4, '4567890123', 'NH'),
(5, '5678901234', 'KB'),
(6, '6789012345', 'NH'),
(7, '7890123456', 'KB'),
(8, '8901234567', 'NH'),
<<<<<<< HEAD
(9, '9012345678', 'KB');

=======
(9, '9012345678', 'KB'),
(10, '1234567891', 'NH');
>>>>>>> 40a89a76632c3c7c9dcfa58292bd65cdc7b59483
INSERT INTO `product` (`member_id`, `product_created_at`, `product_point`, `product_content`, `product_title`, `product_category`, `product_condition_state`, `product_trade_state`, `product_upload_status`, product_hit) VALUES
(1, '2024-01-01 10:00:00', 1000, '깨끗하게 사용한 아기 책입니다. 페이지마다 오염 없이 잘 보관되었고, 아기가 처음 책을 접하기 좋은 색감과 그림이 많습니다. 5권 세트로 판매합니다.', '동화책 5권 팔아요', 'KIDS_BOOKS', 'HIGH', 'TRADE_COMPLETED', 'STATUS_APPROVE', 504),
(2, '2024-01-02 10:30:00', 4500, '저렴하게 팔아요! 아기 옷 5벌 세트. 대부분 한두 번 입은 상품으로 아주 깨끗합니다. 겨울용과 여름용 혼합 세트입니다. 사이즈는 80 사이즈입니다.', '애기옷 5벌 싸게 팔아요', 'KIDS_CLOTHING', 'HIGH', 'TRADING_AVAILABLE', 'STATUS_APPROVE', 151),
(3, '2024-01-03 11:00:00', 2000, '뉴발란스 아기 신발입니다. 사이즈 130mm로 발이 작은 아기에게 적합합니다. 착용 흔적 거의 없으며, 브랜드 제품이라 더 튼튼합니다. 작은아들 줄려고 샀는데 사이즈가 안맞네요 ㅠㅠ', '뉴발란스 신발 (사이즈 130)', 'KIDS_CLOTHING', 'HIGH', 'TRADING_AVAILABLE', 'STATUS_APPROVE', 55),
(4, '2024-01-04 12:00:00', 2500, '작고 귀여운 아기 가방입니다. 외출 시 필요한 작은 물건들을 담기에 딱 좋아요. 가방 안에 작은 포켓도 있어 편리하게 사용할 수 있습니다. 상태는 양호합니다.', '외출용(여행용) 가방', 'KIDS_CLOTHING', 'MEDIUM', 'TRADING_AVAILABLE', 'STATUS_APPROVE', 222),
(5, '2024-01-05 13:00:00', 15000, '유모차입니다. 2년정도 사용했어요 적당한 크기라서, 야외에서도 편하게 사용할 수 있어요. 바퀴도 부드럽고, 물티슈와 컵홀더도 포함되어 있어요.', '유모차팔아요~', 'MISC', 'LOW', 'TRADE_COMPLETED', 'STATUS_APPROVE', 124),
(6, '2024-01-06 14:00:00', 10000, '편안하고 안정적인 아기 침대입니다. 퀄리티 좋은 나무로 제작되어 튼튼하고 안전합니다. 침대 매트리스도 포함되어 있으며, 푹신해서 좋아요', '애기 나무 침대', 'MISC', 'MEDIUM', 'TRADING_AVAILABLE', 'STATUS_APPROVE',654),
(7, '2024-01-07 15:00:00', 5000, '아기 용품들을 한 번에 구입하고 싶다면 이 세트를 추천해요! 기저귀, 젖병, 장난감 등 모든 걸 포함한 세트입니다. 깨끗하게 사용했습니다.', '아기 용품 세트(젖병, 장난감, 기저귀)', 'MISC', 'MEDIUM', 'TRADE_COMPLETED', 'STATUS_APPROVE',45),
(8, '2024-01-08 16:00:00', 2000, '아기 의자입니다. 식사할 때나 놀이 시간에 편안하게 앉을 수 있도록 디자인되었습니다. 조절 가능한 높이와 안전벨트가 있어서 안전하게 사용할 수 있습니다.', '식사용 의자', 'MISC', 'MEDIUM', 'TRADING_AVAILABLE', 'STATUS_APPROVE',362),
(9, '2024-01-09 17:00:00', 9000, '아기용 침대입니다. 헤드보드에 귀여운 디자인이 있어 인테리어 효과도 있습니다. 매트리스는 별도 구매해야 하며, 전반적인 상태는 매우 좋습니다.', '아기 침대', 'MISC', 'HIGH', 'TRADE_COMPLETED', 'STATUS_APPROVE',152),
(10, '2024-01-10 18:00:00', 2100, '사용한 지 얼마 안 된 아기 장난감입니다. 쥐거나 물어볼 수 있는 부드러운 재질로 만들어졌고, 소리도 나서 아기가 재미있어할 거예요.', '아기 장난감 (부드러운 재질)', 'KIDS_TOYS', 'HIGH', 'TRADING_AVAILABLE', 'STATUS_APPROVE',32),
(1, '2024-01-11 19:00:00', 900, '아기 머리를 따뜻하게 보호할 수 있는 예쁜 모자입니다. 신생아부터 사용할 수 있으며, 색상은 부드러운 파스텔톤입니다. 사용감은 꽤 있지만, 양호한 상태에요.', '파스텔톤 모자', 'KIDS_CLOTHING', 'MEDIUM', 'TRADE_COMPLETED', 'STATUS_APPROVE',92),
(2, '2024-01-12 20:00:00', 650, '사용 흔적 거의 없는 아기 손톱깎이입니다. 안전하게 사용할 수 있도록 디자인된 제품으로, 아기의 작은 손톱도 쉽게 깎을 수 있습니다. 한번 사용해본 제품입니다.', '아기 손톱깎이', 'MISC', 'HIGH', 'TRADING_AVAILABLE', 'STATUS_APPROVE',125),
(3, '2024-01-13 21:00:00', 700, '튼튼하고 안전한 아기 의자입니다. 식사나 놀이를 할 때 편리하게 사용할 수 있으며, 5점식 안전벨트도 포함되어 있어요.', '아기 의자 (식사용)', 'MISC', 'MEDIUM', 'TRADE_COMPLETED', 'STATUS_APPROVE',214),
(4, '2024-01-14 22:00:00', 750, '크기는 S부터 M까지 다양한 사이즈가 있으며, 여분으로 남은 기저귀를 판매합니다. 포장은 그대로 입니다.', '여분 기저귀 팝니다', 'MISC', 'HIGH', 'TRADING_AVAILABLE', 'STATUS_APPROVE',251),
(5, '2024-01-15 23:00:00', 2100, '유모차 액세서리입니다. 선풍기와 컵홀더, 장난감이 달려 있어 유모차 사용 시 더 편리합니다. 모두 새 제품처럼 깨끗하게 사용됐습니다.', '유모자 악세서리', 'MISC', 'HIGH', 'TRADE_COMPLETED', 'STATUS_APPROVE',235),
(6, '2024-01-16 10:00:00', 550, '아기띠입니다. 신생아부터 사용 가능한 아기띠로, 허리와 어깨에 부담을 덜어주는 디자인입니다. 색상은 네이비 블루이며, 상태는 양호합니다.', '아기띠 (네이비 블루)', 'KIDS_CLOTHING', 'LOW', 'TRADING_AVAILABLE', 'STATUS_APPROVE',546),
(7, '2024-01-17 11:00:00', 1100, '아기 세제입니다. 아기 피부에 안전한 성분으로 만들어졌으며, 큰 용량 한 개 남아 있습니다. 사용 기한도 넉넉합니다.', '애기용 안전 세제 1개 팔아요', 'MISC', 'HIGH', 'TRADE_COMPLETED', 'STATUS_APPROVE',344),
(8, '2024-01-18 12:00:00', 950, '아기 바디워시입니다. 아기의 피부를 부드럽게 세정할 수 있는 제품으로, 사용 후 피부에 자극이 없습니다. 사용 기한이 많이 남아 있습니다.', '아기 바디워시', 'MISC', 'LOW', 'TRADING_AVAILABLE', 'STATUS_APPROVE',342),
(9, '2024-01-19 13:00:00', 4000, '아기 옷입니다. 한 번도 사용하지 않은 새 옷으로, 사이즈 80에 딱 맞는 옷입니다. 겨울철에 입기 좋은 따뜻한 옷입니다.', '겨울철 아기 패딩', 'KIDS_CLOTHING', 'HIGH', 'TRADE_COMPLETED', 'STATUS_APPROVE',226),
(10, '2024-01-20 14:00:00', 850, '겨울철 아기 담요입니다. 부드럽고 따뜻한 소재로 만들어져 아기가 차가운 바닥에서 편안하게 쉴 수 있습니다. 상태는 매우 좋습니다.', '아기 담요', 'OUTDOOR_SUPPLIES', 'LOW', 'TRADING_AVAILABLE', 'STATUS_APPROVE',235),
(1, '2024-01-21 15:00:00', 1100, '수유복입니다. 아기에게 수유할 때 편리하게 착용할 수 있는 제품으로, 착용하기 쉽고 편안합니다. 상태는 좋습니다.', '아기 수유복', 'OUTDOOR_SUPPLIES', 'MEDIUM', 'TRADE_COMPLETED', 'STATUS_APPROVE',125),
(2, '2024-01-22 16:00:00', 1150, '아기 배게입니다. 목을 편안하게 지지할 수 있도록 디자인된 배게입니다. 새 제품처럼 깨끗합니다.', '아기 배게', 'MISC', 'HIGH', 'TRADING_AVAILABLE', 'STATUS_APPROVE', 54),
(3, '2024-01-23 17:00:00', 3300, '아기 목욕 용품 세트입니다. 바디워시, 샴푸, 수건 등 아기 목욕에 필요한 용품들이 모두 포함되어 있습니다. 모두 미개봉 새 제품입니다.', '아기 목욕 용품 세트', 'MISC', 'HIGH', 'TRADE_COMPLETED', 'STATUS_APPROVE',22);


INSERT INTO `product_img` (`product_id`, `image_path`) VALUES
(1, '/images/products/아이책 5권.png'),
(2, '/images/products/아기 여름옷 2.png'),
(2, '/images/products/아기 여름옷 1.png'),
(2, '/images/products/아기 옷.png'),
(3, '/images/products/뉴발 아기 신발.png'),
(4, '/images/products/아기 가방.png'),
(5, '/images/products/유모차.png'),
(6, '/images/products/아기나무침대.png'),
(7, '/images/products/아기 젖병.png'),
(7, '/images/products/아기 장난감.png'),
(8, '/images/products/아기 의자.png'),
(9, '/images/products/아기 침대.png'),
(10, '/images/products/아기장난감.png'),
(11, '/images/products/아기 모자.png'),
(12, '/images/products/아기 손톱깍이.png'),
(13, '/images/products/아기 의자2.png'),
(14, '/images/products/기저귀 가방.png'),
(15, '/images/products/유모차 악세서리.png'),
(16, '/images/products/아기 띠.png'),
(17, '/images/products/아기 세재.png'),
(18, '/images/products/아기 바디워시.png'),
(19, '/images/products/아기 겨울 옷.png'),
(20, '/images/products/아기 담요.png'),
(21, '/images/products/수유복.png'),
(22, '/images/products/아기 베개.png'),
(23, '/images/products/아기목욕용품세트.png');


INSERT INTO `product_comment` (`member_id`, `product_comment_created_at`, `product_comment_id`, `product_id`, `product_comment_content`) VALUES
(4, '2024-11-11 18:02:32.056659', 1, 1, '책 내용에 그림이 많이 있나요?'),
(3, '2024-11-11 18:26:01.791108', 2, 1, '맨 아래 있는 책 제목이 잘 안보여요'),
(1, '2024-11-11 18:33:33.883347', 3, 3, '많이 깨끗해 보이는데 사진 상태랑 똑같은 것 맞죠?'),
(1, '2024-11-11 18:35:50.574058', 4, 3, '배송은 얼마나 걸릴까요?'),
(9, '2024-11-11 18:42:47.885365', 5, 4, '디자인이 귀엽긴 한데 그림으로는 크기가 감이 안잡히네요.'),
(5, '2024-11-11 18:47:48.064272', 6, 8, '아기 의자 찾고 있는 중입니다. 아기가 굴러 떨어지지는 않을까요 ? 약간 불안하네요'),
(6, '2024-11-11 18:54:55.911301', 7, 17, '개봉 하지 않은 제품인가요?'),
(7, '2024-11-11 18:57:29.029771', 8, 18, '개봉하지 않은 상태인가요?'),
(1, '2024-11-11 18:59:24.186484', 9, 9, '혹시 크기는 어느정도 인가요?'),
(1, '2024-11-11 19:03:36.520695', 10, 15, '사용하기 편해보이네요. 혹시 사용기간이 얼마나 되나요?'),
(4, '2024-11-11 19:09:50.006252', 11, 13, '조금 높아보이는데 높이 조절도 가능한 가요 ?'),
(9, '2024-11-11 19:21:28.982848', 12, 7, ' 상태랑 가격이 좋네요! 바로 구매 신청 눌렀어요');





INSERT INTO `product_reply` (`member_id`, `product_comment_id`, `product_id`, `product_reply_created_at`, `product_reply_id`, `product_reply_content`) VALUES
(1, 1, 1, '2024-11-11 18:03:36.544021', 1, '그림이 대부분이고 약간의 설명이 있어요'),
(1, 2, 1, '2024-11-11 18:27:49.394339', 2, '\'동물 친구가 좋아\' 입니다.'),
(3, 3, 3, '2024-11-11 18:34:43.377477', 3, '네. 글을 올릴 때 찍고 그대로 상자에 넣어서 보관 중 입니다.'),
(3, 4, 3, '2024-11-11 18:36:33.941760', 4, '배송은 보통 2-3일 소요됩니다.'),
(4, 5, 4, '2024-11-11 18:44:39.535088', 5, '사이즈는 17*16*8 입니다.'),
(8, 6, 8, '2024-11-11 18:48:16.386367', 6, '안전 벨트가 있어서 안전합니다'),
(7, 7, 17, '2024-11-11 18:55:38.212703', 7, '네 개봉하지 않은 큰 용량 아기 세제 한 개 입니다.'),
(8, 8, 18, '2024-11-11 18:57:53.491453', 8, '개봉 후 7번 정도 사용한 상태입니다.'),
(9, 9, 9, '2024-11-11 19:00:48.025354', 9, '유아용 침대로 76cm x 141cm 입니다.'),
(5, 10, 15, '2024-11-11 19:04:19.021691', 10, '3달을 사용했습니다. 흠집 없이 깨끗한 상태입니다.'),
(3, 11, 13, '2024-11-11 19:10:00.159326', 11, '네 높이 조절 가능합니다.'),
(7, 12, 7, '2024-11-11 19:21:45.491596', 12, '감사합니다. 배송 바로 보냈습니다.');


INSERT INTO `orders` (`order_date`, `order_delivery_date`, `order_id`, `product_id`, `order_member_email`, `order_way_bill`, `seller_member_email`, `order_state`) VALUES
 ('2024-11-11 19:25:31.847280', NULL, 1, 16, 'hong@naver.com', NULL, 'jang@naver.com', 'AVAILABLE'),
 ('2024-11-11 19:25:31.847280', '2024-11-12 11:30:00.000000', 2, 1, 'jang@naver.com', 'WB564738291', 'hong@naver.com', 'DELIVERED'),
 ('2024-11-11 19:30:12.234567', '2024-11-12 10:30:00.000000', 3, 5, 'kim@naver.com', 'WB123456789', 'choi@naver.com', 'DELIVERED'),
('2024-11-11 19:40:23.456789', '2024-11-14 09:15:00.000000', 4, 7, 'leej@naver.com', 'WB192837465', 'oh@naver.com', 'DELIVERED'),
('2024-11-11 19:50:01.678901', '2024-11-12 11:30:00.000000', 5, 9, 'hong@naver.com', 'WB564738292', 'leej@naver.com', 'DELIVERED'),
('2024-11-11 19:55:15.789012', NULL, 6, 11, 'lee@naver.com', NULL, 'hong@naver.com', 'COMPLETED'),
('2024-11-11 20:00:40.890123', NULL, 7, 13, 'hong@naver.com', NULL, 'lee@naver.com', 'COMPLETED'),
('2024-11-11 20:05:30.901234', NULL, 8, 6, 'yoo@naver.com', NULL, 'lee@naver.com', 'AVAILABLE'),
('2024-11-11 20:10:20.012345', NULL, 9, 15, 'jang@naver.com', 'WB658321987', 'choi@naver.com', 'SHIPPING'),
('2024-11-11 20:10:20.012345', NULL, 10, 17, 'jang@naver.com', 'WB651321987', 'oh@naver.com', 'SHIPPING'),
('2024-11-11 20:10:20.012345', NULL, 11, 19, 'lee@naver.com', 'WB654221987', 'leej@naver.com', 'SHIPPING'),
('2024-11-11 20:10:20.012345', NULL, 12, 21, 'oh@naver.com', NULL, 'hong@naver.com', 'COMPLETED'),
('2024-11-11 20:10:20.012345', NULL, 13, 23, 'oh@naver.com', NULL, 'lee@naver.com', 'COMPLETED'),
('2024-11-11 20:05:30.901234', NULL, 14, 3, 'leej@naver.com', NULL, 'lee@naver.com', 'AVAILABLE'),
('2024-11-11 20:05:30.901234', NULL, 15, 3, 'yoo@naver.com', NULL, 'lee@naver.com', 'AVAILABLE');