package com.project.ibe.dto.order;

import lombok.Data;

//구매확정.(배송완료 업데이트)
@Data
public class OrderFinishedRequest {
    private Long orderId;
    private Long productId;
}
