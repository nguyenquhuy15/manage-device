package com.uet.controller;

import java.util.List;

import com.uet.model.dto.account.AccountDTO;
import com.uet.model.form.account.AccountFilterForm;
import com.uet.model.form.account.CreatingAccountForAdminForm;
import com.uet.model.form.account.CreatingAccountForm;
import com.uet.model.form.devices.CreatingDeviceForm;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.uet.model.dto.account.AccountNoDepartmentDTO;
import com.uet.model.dto.account.ImportedAccountInfoDTO;
import com.uet.model.validation.account.AccountUsernameExists;
import com.uet.service.AccountService;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(value = "/api/v1/accounts")
@Validated
@Log4j2
public class AccountController {

	@Autowired
	private AccountService accountService;
	@GetMapping
	public Page<AccountDTO> getAllAccounts(Pageable pageable, @Valid AccountFilterForm form){
		return accountService.getAllAccounts(pageable, form);
	}

	@GetMapping("/username/exists")
	public boolean isAccountExistsByUsername(String username) {
		return accountService.isAccountExistsByUsername(username);
	}
	@PostMapping
	public String createAccount(@RequestBody @Valid CreatingAccountForAdminForm form) {
		accountService.createAccount(form);
		return "create successfully!";
	}

	@GetMapping("/email/exists")
	public boolean isAccountExistsByEmail(String email) {
		return accountService.isAccountExistsByEmail(email);
	}

	@GetMapping("/usernameOrEmail/exists")
	public boolean isAccountExistsByUsernameOrEmail(String usernameOrEmail) {
		return accountService.isAccountExistsByUsername(usernameOrEmail) || accountService.isAccountExistsByEmail(usernameOrEmail);
	}
	
	@GetMapping("/detail")
	public List<AccountDTO> getAccountInfo() {
		return accountService.getAccountInfo();
	}

	@GetMapping("/noDepartment")
	public List<AccountNoDepartmentDTO> getAllAccountsNoDepartment(Sort sort,
			@RequestParam(value = "q", required = false) String q) {
		return accountService.getAllAccountsNoDepartment(sort, q);
	}
	
	@GetMapping("/info")
	public List<ImportedAccountInfoDTO> getInfoAccountByUsername(
			@RequestParam(name = "usernames") List<@AccountUsernameExists String> usernames) {
		return accountService.getInfoAccountByUsername(usernames);
	}
	@DeleteMapping("/{id}")
	public String deleteAccount(
			@PathVariable(name = "id") Integer accountId) {
		accountService.deleteAccount(accountId);
		return "delete successfully!";
	}

}
