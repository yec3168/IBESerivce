INSERT INTO product_comment (
    product_comment_content, product_comment_created_at,
    product_id, member_id
) VALUES
    ('이 제품 언제까지 판매되나요?', NOW(), 3, 1),
    ('배송은 얼마나 걸릴까요?', NOW(), 5, 2),
    ('가격이 너무 좋네요. 고민 중입니다.', NOW(), 6, 1),
    ('사용 후기 더 있으면 좋겠어요.', NOW(), 7, 3),
    ('사려고 하는데, 사이즈는 어떻게 되나요?', NOW(), 8, 2),
    ('소음이 있나요? 사용해 보신 분 있나요?', NOW(), 4, 3),
    ('배송비는 얼마인가요?', NOW(), 9, 1),
    ('이 제품의 사이즈 정보가 필요합니다.', NOW(), 8, 2),
    ('사진과 동일한 제품인가요?', NOW(), 10, 3)
;