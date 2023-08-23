package com.idr.pdd.dto;

import lombok.Data;

@Data
public class LeadTime {

	private String orderId;
	private String orderName;
	private String itemId;
	private String itemName;
	private String processName;
	private String processTime;
	private String leadTime;
	private String lossTime;

}
