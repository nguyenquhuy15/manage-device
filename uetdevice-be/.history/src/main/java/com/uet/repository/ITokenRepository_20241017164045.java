package com.uet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.uet.model.entity.Account;
import com.uet.model.entity.Token;
import com.uet.model.entity.Token.Type;

public interface ITokenRepository extends JpaRepository<Token, Integer> {

	@Modifying
	void deleteByTypeAndAccount(Type type, Account account);

	Token findBykeyAndType(String key, Type type);
}
