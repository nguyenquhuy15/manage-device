package com.uet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.uet.config.security.SecurityUtils;
import com.uet.model.dto.account.AccountNoDepartmentDTO;
import com.uet.model.dto.account.ImportedAccountInfoDTO;
import com.uet.model.dto.department.DepartmentDTO;
import com.uet.model.entity.Account;
import com.uet.model.entity.Department;
import com.uet.model.specification.account.AccountNoDepartmentSpecification;
import com.uet.repository.IAccountRepository;

@Service
public class AccountServiceImpl extends BaseService implements AccountService {

	@Autowired
	private IAccountRepository accountRepository;
	
	@Autowired
	private SecurityUtils securityUtils;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Account account = accountRepository.findByUsername(username);

		if (account == null) {
			throw new UsernameNotFoundException(username);
		}

		return new User(
				account.getUsername(), 
				account.getPassword(), 
				AuthorityUtils.createAuthorityList(account.getRole().toString()));
	}

	@Override
	public Account getAccountByUsername(String username) {
		return accountRepository.findByUsername(username);
	}

	@Override
	public boolean isAccountExistsByUsername(String username) {
		return accountRepository.existsByUsername(username);
	}

	@Override
	public boolean isAccountExistsByEmail(String email) {
		return accountRepository.existsByEmail(email);
	}

	@Override
	public boolean isOldPasswordCorrect(String oldPassword) {
		return passwordEncoder.matches(
				oldPassword, 
				securityUtils.getCurrentAccountLogin().getPassword());
	}

	@Override
	public boolean isAccountExistsById(Integer id) {
		return accountRepository.existsById(id);
	}

	@Override
	public Account getAccountById(Integer id) {
		return accountRepository.findById(id).get();
	}

	@Override
	public DepartmentDTO getDepartmentInfo() {
		Account account = securityUtils.getCurrentAccountLogin();
		Department department = account.getDepartment();
		DepartmentDTO departmentDto = convertObjectToObject(department, DepartmentDTO.class);
		return departmentDto;
	}

	@Override
	public List<AccountNoDepartmentDTO> getAllAccountsNoDepartment(Sort sort, String q) {
		
		Specification<Account> where = AccountNoDepartmentSpecification.buildWhere(q);
		
		// get entity list
		List<Account> entities = accountRepository.findAll(where, sort);

		// convert entity to dto list
		List<AccountNoDepartmentDTO> dtos = convertListObjectToListObject(entities, AccountNoDepartmentDTO.class);

		return dtos;
	}
	
	@Override
	public List<ImportedAccountInfoDTO> getInfoAccountByUsername(List<String> usernames) {
		
		// get entity list
		List<Account> entities = accountRepository.findByUsernameIn(usernames);
		
		// convert entity to dto list
		List<ImportedAccountInfoDTO> dtos = convertListObjectToListObject(entities, ImportedAccountInfoDTO.class);

		return dtos;
	}
}
