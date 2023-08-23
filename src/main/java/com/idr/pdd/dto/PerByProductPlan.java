package com.idr.pdd.dto;

import lombok.Data;

@Data
public class PerByProductPlan {

	private String orderName;
	private String itemId;
	private String itemName ;
	private String totalProcessNum;
	private String processPerNum;
	private String badNum;
	private String remaining;
	private String startTime ;
	private String endTime;
	private String delivery;
	private String takenTime;
	private String deliveryRate;

}

