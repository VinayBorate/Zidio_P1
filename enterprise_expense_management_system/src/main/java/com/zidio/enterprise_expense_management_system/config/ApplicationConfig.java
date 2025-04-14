package com.zidio.enterprise_expense_management_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class ApplicationConfig {

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI().components(new Components())
				.info(new Info().title("Enterprise Expense Management System API")
						.description("This app is used to manage enterprise expenses.").version("1.0")
						.contact(new Contact().name("Zidio Development").url("https://zidio.in")
								.email("support@zidio.in"))
						.license(new License().name("ZIDIO001").url("http://zidio001.com")));
	}
}
