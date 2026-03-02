package com.uet.service;

import java.util.List;

import com.uet.model.dto.account.AccountDTO;
import com.uet.model.form.account.AccountFilterForm;
import com.uet.model.form.account.CreatingAccountForAdminForm;
import com.uet.model.form.account.CreatingAccountForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.uet.model.dto.account.AccountNoDepartmentDTO;
import com.uet.model.dto.account.ImportedAccountInfoDTO;
import com.uet.model.dto.department.DepartmentDTO;
import com.uet.model.entity.Account;

public interface AccountService extends UserDetailsService {

	Page<AccountDTO> getAllAccounts(Pageable pageable, AccountFilterForm form);

	void createAccount(CreatingAccountForAdminForm form);

	Account getAccountByUsername(String username);

	Account getAccountById(Integer id);

	boolean isAccountExistsByUsername(String username);

	boolean isAccountExistsByEmail(String email);

	boolean isOldPasswordCorrect(String oldPassword);

	boolean isAccountExistsById(Integer id);

	void deleteAccount(Integer accountId);

	List<AccountDTO> getAccountInfo();


	List<AccountNoDepartmentDTO> getAllAccountsNoDepartment(Sort sort, String q);
	
	List<ImportedAccountInfoDTO> getInfoAccountByUsername(List<String> usernames);

}
