package com.project.ibe.entity.common;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
public abstract class AuditingFields {
    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime entryDate;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime updateDate;
}