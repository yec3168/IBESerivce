package com.project.ibe.services.product;

import com.project.ibe.dto.product.ProductDetailResponse;
import com.project.ibe.dto.product.ProductFormRequest;
import com.project.ibe.dto.product.ProductFormResponse;
import com.project.ibe.entity.common.ProductTradeState;
import com.project.ibe.entity.product.Product;
import com.project.ibe.entity.product.ProductImg;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.product.ProductImgRepository;
import com.project.ibe.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
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
    private String saveImageURL; // C:/ibe/  : 폴더 생성용.


    public ProductFormResponse createProduct(ProductFormRequest productFormRequest, List<MultipartFile> images) throws IOException {
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
        List<String> filePathList = getImagePaths(images, savedProduct);
        ProductFormResponse productFormResponse = modelMapper.map(savedProduct, ProductFormResponse.class);
        productFormResponse.setFilePathList(filePathList);


        return productFormResponse;
    }


//    물품 이미지 저장
    public List<String> getImagePaths(List<MultipartFile> images, Product savedProduct) throws IOException {
        List<ProductImg> productImages = new ArrayList<>();
        List<String> filePathList = new ArrayList<>();

        String productImageUrl = saveImageURL + "products";
        if(!fileService.createDirectory(productImageUrl)){
            throw new BusinessException("Directory가 존재하지 않습니다.", HttpStatus.NOT_FOUND);
        }

        for (MultipartFile image : images) {
            // 파일이름
            String fileName =  fileService.uuidFileName(image);

            String savePath = productImageUrl + File.separator + fileName;
            image.transferTo(new File(savePath)); // 이미지 파일 저장

            // ProductImg 엔티티 생성
            String filePath = "/images/products/" + fileName;

            ProductImg productImg = new ProductImg(savedProduct, filePath);
            productImages.add(productImg);
            filePathList.add(productImg.getImagePath());
        }
        productImgRepository.saveAll(productImages); // 모든 이미지 저장
        return filePathList;
    }

    /**
     * 물품 상세조회
     */

    public ProductDetailResponse getProductDeatail(Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(
                        () -> new BusinessException("등록된 물품이 없거나, 삭제된 게시물 입니다.", HttpStatus.NOT_FOUND)
                );
        product.setProductHit(product.getProductHit() + 1);
        List<ProductImg> productImgList = productImgRepository.findAllByProduct(product);

        // 이미지 Path만 저장.
        List<String> images = new ArrayList<>();
        for(ProductImg productImg: productImgList){
            images.add(productImg.getImagePath());
        }
        ProductDetailResponse productDetailResponse = modelMapper.map(product, ProductDetailResponse.class);
        productDetailResponse.setProductCategory(product.getProductCategory().getDescription());
        productDetailResponse.setProductConditionState(product.getProductConditionState().getDescription());
        productDetailResponse.setProductTradeState(product.getProductTradeState().getDescription());
        productDetailResponse.setImagePath(images);
        return productDetailResponse;
    }
}