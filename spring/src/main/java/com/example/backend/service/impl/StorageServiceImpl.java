package com.example.backend.service.impl;

import com.example.backend.service.StorageService;
import io.minio.*;
import io.minio.errors.ErrorResponseException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {
    @Value("${minio.url}")
    private String url;

    @Value("${minio.bucket.name}")
    private String bucketName;

    private final MinioClient minioClient;

    @PostConstruct
    public void initializeBucket() throws Exception {
        boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
        if (!found) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }
    }

    @Override
    public String storeFile(MultipartFile file) {
        try {
            InputStream inputStream = file.getInputStream();
            String objectName;
            do {
                objectName = UUID.randomUUID().toString();
            } while (isObjectExisted(bucketName, objectName));

            PutObjectArgs putObjectArgs = PutObjectArgs.builder()
                .bucket(bucketName)
                .object(objectName)
                .stream(inputStream, inputStream.available(), -1)
                .contentType(file.getContentType())
                .build();

            ObjectWriteResponse writeResponse = minioClient.putObject(putObjectArgs);
            return url + "/" + bucketName + "/" + writeResponse.object();
        } catch (Exception e) {
            throw new RuntimeException("Error occurred: " + e.getMessage());
        }
    }

    private boolean isObjectExisted(String bucketName, String objectName) {
        try {
            minioClient.statObject(StatObjectArgs.builder()
                .bucket(bucketName)
                .object(objectName)
                .build());
            return true;
        } catch (ErrorResponseException e) {
            return false;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
