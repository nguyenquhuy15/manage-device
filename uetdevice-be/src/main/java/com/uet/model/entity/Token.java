package com.uet.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor(force = true)
@Entity
@RequiredArgsConstructor
@Table(name = "`token`")
public class Token implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    @NonNull
    private Account account;

    @Column(name = "`key`", length = 100, nullable = false, unique = true)
    @NonNull
    private String key;

    @Column(name = "`type`", nullable = false)
    @Enumerated(EnumType.STRING)
    @NonNull
    private Type type;

    @Column(name = "expired_date")
    @Temporal(TemporalType.TIMESTAMP)
    @NonNull
    private Date expiredDate;



    public enum Type {
        REFRESH_TOKEN, REGISTER, FORGOT_PASSWORD;
    }


}
