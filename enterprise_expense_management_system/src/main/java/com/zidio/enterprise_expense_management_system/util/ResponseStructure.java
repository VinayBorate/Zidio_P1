package com.zidio.enterprise_expense_management_system.util;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseStructure<T> {

	private String message;
	private int status;
	private T data;
	private String Token;
}
