INSERT INTO product (
    product_title, product_content, product_point,
    product_trade_state, product_condition_state, product_hit,
    product_category, product_created_at, member_id
) VALUES
    ('유아용 패딩 팝니다', '상태 좋은 남자 아이 파란색 패딩입니다.', 3000, 'TRADING_AVAILABLE', 'HIGH', 1, 'KIDS_CLOTHING', NOW(), 1),
    ('유아용 미끄럽틀 팝니다', '안전한 유아용 미끄럽틀입니다.', 7000, 'TRADING_AVAILABLE', 'HIGH', 10, 'KIDS_TOYS', NOW(), 1),
    ('아기 침대 팝니다', '부드럽고 안전한 아기 침대입니다.', 2000, 'TRADE_COMPLETED', 'HIGH', 5, 'MISC', NOW(), 2),
    ('유아용 장난감 팝니다', '다양한 기능을 가진 유아용 장난감입니다.', 1000, 'TRADING_AVAILABLE', 'MEDIUM', 15, 'KIDS_TOYS', NOW(), 1),
    ('아기용 배냇저고리 팝니다', '부드러운 면 소재의 배냇저고리입니다.', 500, 'TRADING_AVAILABLE', 'HIGH', 20, 'KIDS_CLOTHING', NOW(), 3),
    ('유아용 이유식 용기 팝니다', '이유식 보관에 적합한 용기입니다.', 300, 'TRADE_COMPLETED', 'MEDIUM', 12, 'MISC', NOW(), 1),
    ('유아용 모빌 팝니다', '아기를 위한 예쁜 모빌입니다.', 700, 'TRADING_AVAILABLE', 'HIGH', 8, 'MISC', NOW(), 2),
    ('유아용 욕조 팝니다', '아기 목욕을 위한 안전한 욕조입니다.', 900, 'TRADE_COMPLETED', 'LOW', 7, 'MISC', NOW(), 1),
    ('아기용 기저귀 팝니다', '부드럽고 흡수력이 좋은 기저귀입니다.', 400, 'TRADING_AVAILABLE', 'HIGH', 25, 'MISC', NOW(), 3),
    ('아동 도서 팝니다', '아이들을 위한 흥미로운 도서입니다.', 600, 'TRADING_AVAILABLE', 'MEDIUM', 18, 'KIDS_BOOKS', NOW(), 2),
    ('유아용 인형 팝니다', '사랑스러운 유아용 인형입니다.', 800, 'TRADING_AVAILABLE', 'HIGH', 22, 'KIDS_TOYS', NOW(), 2)
;
