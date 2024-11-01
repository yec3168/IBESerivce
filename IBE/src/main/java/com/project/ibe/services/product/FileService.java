package com.project.ibe.services.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    public Boolean createDirectory(String uploadDir){
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        return true;
    }

    public void saveFile(MultipartFile multipartFile, String url) throws Exception{
        FileOutputStream fos = new FileOutputStream(url);
        fos.write(multipartFile.getBytes());
        fos.close();
    }

    public String uuidFileName(MultipartFile multipartFile){
        UUID uuid = UUID.randomUUID();
        String filename = uuid.toString() + multipartFile.getOriginalFilename().substring(multipartFile.getOriginalFilename().lastIndexOf("."));

        return filename;
    }
}
