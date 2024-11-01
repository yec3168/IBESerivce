package com.project.ibe.services.product;

import com.project.ibe.dto.product.ProductFormRequest;
import com.project.ibe.entity.common.ProductTradeState;
import com.project.ibe.entity.product.Product;
import com.project.ibe.entity.product.ProductImg;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.product.ProductImgRepository;
import com.project.ibe.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {

    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;
    private final ProductImgRepository productImgRepository;

    private final FileService fileService;

    @Value("${imgSave.location}")
    private String saveImageURL; // C:/ibe/
    public Product createProduct(ProductFormRequest productFormRequest, List<MultipartFile> images) throws IOException {
        // 먼저 제품을 저장하여 생성된 ID를 가져옴

        if(!fileService.createDirectory(saveImageURL)){
            throw new BusinessException("Directory가 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        }
        
        // 물품 저장.
        Product product =modelMapper.map(productFormRequest, Product.class);
        product.setProductHit(0);
        product.setProductTradeState(ProductTradeState.TRADING_AVAILABLE);

        /**
         * JWT 완성되면 넣어줘야함.
         */
//        savedProduct.setMember(???);

        Product savedProduct = productRepository.save(product);


        // 이미지를 저장할 리스트.
        List<ProductImg> productImages = new ArrayList<>();
        List<String> filePathList = new ArrayList<>();

        for (MultipartFile image : images) {
            String filePath = saveImageURL + File.separator + fileService.uuidFileName(image);
            image.transferTo(new File(filePath)); // 이미지 파일 저장

            // ProductImg 엔티티 생성
            ProductImg productImg = new ProductImg(savedProduct, filePath);
            productImages.add(productImg);
            filePathList.add(productImg.getImagePath());
        }
        productImgRepository.saveAll(productImages); // 모든 이미지 저장

        return savedProduct; // 저장된 제품 반환

        return null;
    }
}