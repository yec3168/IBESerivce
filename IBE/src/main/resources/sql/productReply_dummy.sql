INSERT INTO product_reply (
    product_reply_content, product_reply_created_at,
    product_id, member_id, product_comment_id
) VALUES
    ('구매하시는 분이 나올 때 까지 거래 가능합니다.', NOW(), 3, 2, 1),
    ('배송은 보통 2-3일 소요됩니다.', NOW(), 5, 1, 2),
    ('고민하지 마세요!', NOW(), 6, 3, 3),
    ('사용 후기 기다리고 있어요!', NOW(), 7, 1, 4),
    ('사이즈는 네이버에 검색해보시면 정확한 치수 있어요.', NOW(), 8, 2, 5),
    ('이 제품은 조용하게 작동합니다.', NOW(), 4, 3, 6),
    ('배송비 포함된 가격입니다.', NOW(), 9, 1, 7),
    ('네, 사진과 동일한 제품입니다!', NOW(), 10, 3, 9),
    ('다른 분들의 후기도 궁금하네요!', NOW(), 6, 1, 4),
    ('저도 관심이 가는 제품입니다.', NOW(), 5, 2, 3)
;