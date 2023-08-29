package com.idr.pdd.dto;

import lombok.Data;

@Data
public class FairPerformance {

	private int rownum;
	private int dataseq;
	private String equipmentId;
	private String equipmentName;
	private String orderId;
	private String orderName;
	private String itemId;
	private String itemName;
	private String processId;
	private String processName;
	private String processTime;
	private String processResult;
	private String startTime;
	private String endTime;
	private String processType;
	private String splitType;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String factoryid;
	private String factoryname;
}
