-- 테스트용 11개 데이터

INSERT INTO product (
    product_title, product_content, product_point,
    product_trade_state, product_condition_state, product_hit,
    product_category, product_created_at, member_id,
    product_upload_status
) VALUES
    ('유아용 패딩 팝니다', '상태 좋은 남자 아이 파란색 패딩입니다.', 3000, 'TRADING_AVAILABLE', 'HIGH', 1, 'KIDS_CLOTHING', NOW(), 1, 'STATUS_WAIT'),
    ('유아용 미끄럽틀 팝니다', '안전한 유아용 미끄럽틀입니다.', 7000, 'TRADING_AVAILABLE', 'HIGH', 10, 'KIDS_TOYS', NOW(), 1, 'STATUS_WAIT'),
    ('아기 침대 팝니다', '부드럽고 안전한 아기 침대입니다.', 2000, 'TRADE_COMPLETED', 'HIGH', 5, 'MISC', NOW(), 2, 'STATUS_WAIT'),
    ('유아용 장난감 팝니다', '다양한 기능을 가진 유아용 장난감입니다.', 1000, 'TRADING_AVAILABLE', 'MEDIUM', 15, 'KIDS_TOYS', NOW(), 1, 'STATUS_WAIT'),
    ('아기용 배냇저고리 팝니다', '부드러운 면 소재의 배냇저고리입니다.', 500, 'TRADING_AVAILABLE', 'HIGH', 20, 'KIDS_CLOTHING', NOW(), 3, 'STATUS_WAIT'),
    ('유아용 이유식 용기 팝니다', '이유식 보관에 적합한 용기입니다.', 300, 'TRADE_COMPLETED', 'MEDIUM', 12, 'MISC', NOW(), 1, 'STATUS_WAIT'),
    ('유아용 모빌 팝니다', '아기를 위한 예쁜 모빌입니다.', 700, 'TRADING_AVAILABLE', 'HIGH', 8, 'MISC', NOW(), 2, 'STATUS_WAIT'),
    ('유아용 욕조 팝니다', '아기 목욕을 위한 안전한 욕조입니다.', 900, 'TRADE_COMPLETED', 'LOW', 7, 'MISC', NOW(), 1, 'STATUS_WAIT'),
    ('아기용 기저귀 팝니다', '부드럽고 흡수력이 좋은 기저귀입니다.', 400, 'TRADING_AVAILABLE', 'HIGH', 25, 'MISC', NOW(), 3, 'STATUS_WAIT'),
    ('아동 도서 팝니다', '아이들을 위한 흥미로운 도서입니다.', 600, 'TRADING_AVAILABLE', 'MEDIUM', 18, 'KIDS_BOOKS', NOW(), 2, 'STATUS_WAIT'),
    ('유아용 인형 팝니다', '사랑스러운 유아용 인형입니다.', 800, 'TRADING_AVAILABLE', 'HIGH', 22, 'KIDS_TOYS', NOW(), 2, 'STATUS_WAIT')
;

-- 90개 추가 데이터
-- INSERT INTO product (
--    product_title, product_content, product_point,
--    product_trade_state, product_condition_state, product_hit,
--    product_category, product_created_at, member_id
-- ) VALUES
--    ('유아용 스쿠터 팝니다', '안전한 유아용 스쿠터입니다.', 15000, 'TRADING_AVAILABLE', 'HIGH', 5, 'KIDS_TOYS', NOW(), 1),
--    ('아기용 유모차 팝니다', '편리한 아기 유모차입니다.', 50000, 'TRADING_AVAILABLE', 'HIGH', 12, 'KIDS_CLOTHING', NOW(), 2),
--    ('아기 수면조끼 팝니다', '부드러운 면 소재의 수면조끼입니다.', 1500, 'TRADING_AVAILABLE', 'HIGH', 7, 'KIDS_CLOTHING', NOW(), 3),
--    ('유아용 타프롱 팝니다', '사랑스러운 유아용 타프롱입니다.', 8000, 'TRADING_AVAILABLE', 'HIGH', 9, 'KIDS_TOYS', NOW(), 1),
--    ('유아용 인라인 스케이트 팝니다', '안전한 유아용 인라인 스케이트입니다.', 25000, 'TRADING_AVAILABLE', 'MEDIUM', 2, 'KIDS_TOYS', NOW(), 2),
--    ('아기 목욕용품 세트 팝니다', '안전한 아기 목욕용품 세트입니다.', 3000, 'TRADING_AVAILABLE', 'HIGH', 6, 'MISC', NOW(), 3),
--    ('아기 체중계 팝니다', '정확한 아기 체중계입니다.', 20000, 'TRADING_AVAILABLE', 'HIGH', 4, 'MISC', NOW(), 1),
--    ('아기 식탁 의자 팝니다', '부드러운 아기 식탁 의자입니다.', 40000, 'TRADING_AVAILABLE', 'HIGH', 15, 'KIDS_CLOTHING', NOW(), 2),
--    ('유아용 피아노 장난감 팝니다', '아기를 위한 피아노 장난감입니다.', 6000, 'TRADING_AVAILABLE', 'MEDIUM', 10, 'KIDS_TOYS', NOW(), 3),
--    ('아기용 커튼 팝니다', '예쁜 아기용 커튼입니다.', 2000, 'TRADING_AVAILABLE', 'HIGH', 8, 'MISC', NOW(), 1),
--    ('유아용 수영복 팝니다', '귀여운 유아용 수영복입니다.', 4000, 'TRADING_AVAILABLE', 'HIGH', 3, 'KIDS_CLOTHING', NOW(), 2),
--    ('유아용 블록 세트 팝니다', '창의력을 키워주는 블록 세트입니다.', 10000, 'TRADING_AVAILABLE', 'HIGH', 11, 'KIDS_TOYS', NOW(), 3),
--    ('아기 용품 세트 팝니다', '여러 가지 아기 용품이 포함된 세트입니다.', 18000, 'TRADING_AVAILABLE', 'HIGH', 5, 'MISC', NOW(), 1),
--    ('유아용 책상 팝니다', '아기들이 사용할 수 있는 작은 책상입니다.', 12000, 'TRADING_AVAILABLE', 'HIGH', 3, 'KIDS_CLOTHING', NOW(), 2),
--    ('아기 발판 팝니다', '아기가 손쉽게 올라탈 수 있는 발판입니다.', 2500, 'TRADING_AVAILABLE', 'MEDIUM', 8, 'MISC', NOW(), 3),
--    ('유아용 안전용품 팝니다', '안전한 유아용 안전용품입니다.', 5000, 'TRADING_AVAILABLE', 'HIGH', 9, 'MISC', NOW(), 1),
--    ('아기 의류 세트 팝니다', '귀여운 아기 의류가 포함된 세트입니다.', 8000, 'TRADING_AVAILABLE', 'HIGH', 14, 'KIDS_CLOTHING', NOW(), 2),
--    ('유아용 치발기 팝니다', '안전한 유아용 치발기입니다.', 1500, 'TRADING_AVAILABLE', 'HIGH', 6, 'MISC', NOW(), 3),
--    ('아기용 주방놀이 세트 팝니다', '부드러운 아기용 주방놀이 세트입니다.', 9000, 'TRADING_AVAILABLE', 'HIGH', 7, 'KIDS_TOYS', NOW(), 1),
--    ('유아용 전동차 팝니다', '안전한 전동차입니다.', 200000, 'TRADING_AVAILABLE', 'HIGH', 13, 'KIDS_TOYS', NOW(), 2),
--    ('아기 침대 매트리스 팝니다', '부드럽고 안전한 아기 침대 매트리스입니다.', 30000, 'TRADING_AVAILABLE', 'HIGH', 5, 'MISC', NOW(), 3),
--    ('유아용 램프 팝니다', '아기를 위한 귀여운 램프입니다.', 15000, 'TRADING_AVAILABLE', 'HIGH', 4, 'MISC', NOW(), 1),
--    ('아기용 안전벨트 팝니다', '안전한 아기용 안전벨트입니다.', 3500, 'TRADING_AVAILABLE', 'HIGH', 6, 'MISC', NOW(), 2),
--    ('유아용 자전거 팝니다', '안전한 유아용 자전거입니다.', 40000, 'TRADING_AVAILABLE', 'HIGH', 8, 'KIDS_TOYS', NOW(), 3),
--    ('아기용 목욕타올 팝니다', '부드러운 아기용 목욕타올입니다.', 2500, 'TRADING_AVAILABLE', 'HIGH', 10, 'MISC', NOW(), 1),
--    ('유아용 음악회 장난감 팝니다', '아기를 위한 음악회 장난감입니다.', 7000, 'TRADING_AVAILABLE', 'HIGH', 12, 'KIDS_TOYS', NOW(), 2),
--    ('아기 치아 보호대 팝니다', '부드러운 아기 치아 보호대입니다.', 1500, 'TRADING_AVAILABLE', 'HIGH', 3, 'MISC', NOW(), 3),
--    ('유아용 의자 팝니다', '편안한 유아용 의자입니다.', 12000, 'TRADING_AVAILABLE', 'HIGH', 11, 'KIDS_FURNITURE', NOW(), 1),
--    ('아기용 전자책 팝니다', '아기를 위한 전자책입니다.', 9000, 'TRADING_AVAILABLE', 'HIGH', 5, 'KIDS_BOOKS', NOW(), 2),
--    ('유아용 퍼즐 팝니다', '재미있는 유아용 퍼즐입니다.', 4000, 'TRADING_AVAILABLE', 'HIGH', 8, 'KIDS_TOYS', NOW(), 3),
--    ('아기용 일회용 기저귀 팝니다', '부드럽고 흡수력이 좋은 일회용 기저귀입니다.', 500, 'TRADING_AVAILABLE', 'HIGH', 25, 'MISC', NOW(), 1),
--    ('유아용 공 팝니다', '부드럽고 안전한 유아용 공입니다.', 1500, 'TRADING_AVAILABLE', 'HIGH', 15, 'KIDS_TOYS', NOW(), 2),
--    ('아기용 수유 패드 팝니다', '편안한 수유 패드입니다.', 2000, 'TRADING_AVAILABLE', 'HIGH', 20, 'MISC', NOW(), 3),
--    ('유아용 부엌 놀이세트 팝니다', '아기를 위한 부엌 놀이세트입니다.', 25000, 'TRADING_AVAILABLE', 'HIGH', 9, 'KIDS_TOYS', NOW(), 1),
--    ('아기용 미니 의자 팝니다', '귀여운 아기용 미니 의자입니다.', 8000, 'TRADING_AVAILABLE', 'HIGH', 6, 'KIDS_FURNITURE', NOW(), 2),
--    ('유아용 가방 팝니다', '사랑스러운 유아용 가방입니다.', 12000, 'TRADING_AVAILABLE', 'HIGH', 7, 'KIDS_CLOTHING', NOW(), 3),
--    ('아기용 손수건 팝니다', '부드러운 아기용 손수건입니다.', 1000, 'TRADING_AVAILABLE', 'HIGH', 11, 'MISC', NOW(), 1),
--    ('유아용 나무 장난감 팝니다', '친환경 나무 장난감입니다.', 16000, 'TRADING_AVAILABLE', 'HIGH', 5, 'KIDS_TOYS', NOW(), 2),
--    ('아기용 전동 블럭 팝니다', '전동으로 움직이는 블럭입니다.', 22000, 'TRADING_AVAILABLE', 'HIGH', 3, 'KIDS_TOYS', NOW(), 3),
--    ('유아용 배낭 팝니다', '작고 귀여운 유아용 배낭입니다.', 10000, 'TRADING_AVAILABLE', 'HIGH', 12, 'KIDS_CLOTHING', NOW(), 1),
--    ('아기용 슬리퍼 팝니다', '편안한 아기용 슬리퍼입니다.', 2500, 'TRADING_AVAILABLE', 'HIGH', 10, 'MISC', NOW(), 2),
--    ('유아용 캔디 박스 팝니다', '아기를 위한 귀여운 캔디 박스입니다.', 3500, 'TRADING_AVAILABLE', 'HIGH', 9, 'KIDS_TOYS', NOW(), 3),
--    ('아기용 체중계 팝니다', '아기 체중을 쉽게 재는 체중계입니다.', 15000, 'TRADING_AVAILABLE', 'HIGH', 8, 'MISC', NOW(), 1),
--    ('유아용 자동차 장난감 팝니다', '부드러운 자동차 장난감입니다.', 3000, 'TRADING_AVAILABLE', 'HIGH', 7, 'KIDS_TOYS', NOW(), 2),
--    ('아기용 화장실 용품 팝니다', '안전한 아기용 화장실 용품입니다.', 4500, 'TRADING_AVAILABLE', 'HIGH', 6, 'MISC', NOW(), 3),
--    ('유아용 바구니 팝니다', '여러 가지 물건을 담을 수 있는 바구니입니다.', 2000, 'TRADING_AVAILABLE', 'HIGH', 5, 'MISC', NOW(), 1),
--    ('아기용 기저귀 가방 팝니다', '기저귀를 보관하기 좋은 가방입니다.', 6000, 'TRADING_AVAILABLE', 'HIGH', 4, 'KIDS_CLOTHING', NOW(), 2)
-- ;

