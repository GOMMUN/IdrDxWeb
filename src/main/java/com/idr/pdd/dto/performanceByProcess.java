package com.idr.pdd.dto;

import lombok.Data;

@Data
public class performanceByProcess {

	private String rownum;
	private String orderName;
	private String itemId;
	private String itemName;
	private String processName;
	private String avgProcessTime;
	private String totalPNum;
	private String processPerNum;
	private String badNum;
	private String remaining;
	private String startTime;
	private String endTime;
	private String takenTime;
}
