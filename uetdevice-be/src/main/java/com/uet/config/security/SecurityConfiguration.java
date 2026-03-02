package com.uet.config.security;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.uet.config.exception.AuthExceptionHandler;
import com.uet.model.entity.Account.Role;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	@Autowired
	private AuthExceptionHandler authExceptionHandler;
	
	@Autowired
	private JWTAuthorizationFilter jwtAuthorizationFilter;
	
	@Bean
	public AuthenticationManager authenticationManager(
			AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@SuppressWarnings("removal")
	@Bean
	public SecurityFilterChain configureSecurity(HttpSecurity http) throws Exception {
		http
			.cors(withDefaults())
			.csrf((csrf) -> csrf.disable())
			.authorizeHttpRequests((requests) -> requests
					
					// Swagger
					.requestMatchers("/swagger-ui/**", "v3/api-docs/**").anonymous()
					
					// check exists
					.requestMatchers(RegexRequestMatcher.regexMatcher(".+/exists.+")).anonymous()
					
					// authen
					.requestMatchers("/api/v1/auth/password/change").authenticated()
					.requestMatchers("/api/v1/auth/**").anonymous()

					//viewlist device
					.requestMatchers("/api/v1/devices/**").hasAnyAuthority(Role.ADMIN.toString(),Role.MANAGER.toString())
					.requestMatchers(HttpMethod.GET, "/api/v1/devices")
					.hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())

					.requestMatchers("/api/v1/devices/filter")
					.hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())
					// create devices
					.requestMatchers("/api/v1/devices/status")
					.hasAnyAuthority(Role.ADMIN.toString())
					.requestMatchers(HttpMethod.POST, "/api/v1/devices")
					.hasAnyAuthority(Role.ADMIN.toString())
					//type
					.requestMatchers("/api/v1/types/**").hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())
					.requestMatchers(HttpMethod.GET, "/api/v1/types")
					.hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())

					// create type
					.requestMatchers(HttpMethod.POST, "/api/v1/types")
					.hasAnyAuthority(Role.ADMIN.toString())
					//lab
					.requestMatchers("/api/v1/labs/name")
					.hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())
					// create type
					.requestMatchers(HttpMethod.POST, "/api/v1/labs")
					.hasAnyAuthority(Role.ADMIN.toString())

					// update device
					.requestMatchers(HttpMethod.PUT, "/api/v1/devices/**")
					.hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())

					// get devices by id
					.requestMatchers(HttpMethod.GET, "/api/v1/devices/{id}/**")
					.hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())

					// import device
					.requestMatchers(HttpMethod.POST, "/api/v1/devices/import")
						.hasAnyAuthority(Role.ADMIN.toString())

					// Delete all devices
					.requestMatchers(HttpMethod.DELETE, "/api/v1/devices")
					.hasAuthority(Role.ADMIN.toString())  // Only ADMIN can delete all devices
					// delete device id
					.requestMatchers(HttpMethod.DELETE, "/api/v1/devices/**")
					.hasAnyAuthority(Role.ADMIN.toString())
					// remove device in lab
					.requestMatchers(HttpMethod.DELETE, "/api/v1/devices/device/**")
					.hasAnyAuthority(Role.ADMIN.toString())

					.requestMatchers("/api/v1/accounts/**").hasAnyAuthority(Role.ADMIN.toString())
					.requestMatchers(HttpMethod.GET, "/api/v1/accounts/")
					.hasAnyAuthority(Role.ADMIN.toString())

					//viewlist maintenance
					.requestMatchers("/api/v1/maintenances/**").hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())
					.requestMatchers(HttpMethod.GET, "/api/v1/maintenances")
					.hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())

					// delete department
					.requestMatchers(HttpMethod.DELETE, "/api/v1/departments")
						.hasAnyAuthority(Role.ADMIN.toString())

					// update department
					.requestMatchers(HttpMethod.PUT, "/api/v1/departments/**")
						.hasAnyAuthority(Role.ADMIN.toString())
						
					// create department
					.requestMatchers("/api/v1/accounts/noDepartment")
						.hasAnyAuthority(Role.ADMIN.toString())
					.requestMatchers(HttpMethod.POST, "/api/v1/departments")
						.hasAnyAuthority(Role.ADMIN.toString())

					// remove accounts in department
					.requestMatchers(HttpMethod.DELETE, "/api/v1/departments/accounts/**")
						.hasAnyAuthority(Role.ADMIN.toString())


					// delete account id
					.requestMatchers(HttpMethod.DELETE, "/api/v1/accounts/**")
					.hasAnyAuthority(Role.ADMIN.toString())
					
					// get department by id
					.requestMatchers(HttpMethod.GET, "/api/v1/departments/{id}/**")
						.hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())
					.requestMatchers(HttpMethod.POST, "/api/v1/accounts")
					.hasAnyAuthority(Role.ADMIN.toString())
							
					// view list department
					.requestMatchers(HttpMethod.GET, "/api/v1/departments/**")
						.hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())

                    //viewlist loans
                    .requestMatchers("/api/v1/loans/**").hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())
                    .requestMatchers(HttpMethod.GET, "/api/v1/loans")
                    .hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())

					// get loan by id
					.requestMatchers(HttpMethod.GET, "/api/v1/loans/{id}/**")
					.hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())

					// update loan
					.requestMatchers(HttpMethod.PUT, "/api/v1/loans/**")
					.hasAnyAuthority(Role.ADMIN.toString(), Role.MANAGER.toString())


					// create loan
					.requestMatchers("/api/v1/devices/noLoan")
					.hasAnyAuthority(Role.ADMIN.toString())
					.requestMatchers(HttpMethod.POST, "/api/v1/loans")
					.hasAnyAuthority(Role.ADMIN.toString())

					// Endpoint trả thiết bị mượn
					.requestMatchers(HttpMethod.DELETE, "/api/v1/loans/devices/**")
					.hasAnyAuthority(Role.ADMIN.toString())

					// template excel files
					.requestMatchers("/api/v1/files/**")
						.anonymous()
						
					.anyRequest().authenticated())
			
			.httpBasic(withDefaults())
			.addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
			.exceptionHandling()
			.authenticationEntryPoint(authExceptionHandler)
            .accessDeniedHandler(authExceptionHandler);
		
		return http.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		final CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
		configuration.applyPermitDefaultValues();
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
