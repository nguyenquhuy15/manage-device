package com.uet.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.uet.model.dto.account.AccountNoDepartmentDTO;
import com.uet.model.dto.account.ImportedAccountInfoDTO;
import com.uet.model.dto.department.DepartmentDTO;
import com.uet.model.entity.Account;

public interface AccountService extends UserDetailsService {

	Account getAccountByUsername(String username);

	Account getAccountById(Integer id);

	boolean isAccountExistsByUsername(String username);

	boolean isAccountExistsByEmail(String email);

	boolean isOldPasswordCorrect(String oldPassword);

	boolean isAccountExistsById(Integer id);
	
	DepartmentDTO getDepartmentInfo();

	List<AccountNoDepartmentDTO> getAllAccountsNoDepartment(Sort sort, String q);
	
	List<ImportedAccountInfoDTO> getInfoAccountByUsername(List<String> usernames);

}
