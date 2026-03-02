package com.uet.repository;

import com.uet.model.entity.Account;
import com.uet.model.entity.Token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;

public interface ITokenRepository extends JpaRepository<Token, Integer>, JpaSpecificationExecutor<Token> {
    @Modifying
    void deleteByTypeAndAccount(Token.Type type, Account account);

    Token findBykeyAndType(String key, Token.Type type);


}
