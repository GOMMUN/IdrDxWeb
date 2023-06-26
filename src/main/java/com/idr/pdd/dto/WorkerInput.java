package com.idr.pdd.dto;

import lombok.Data;

@Data
public class WorkerInput {

	private int dataseq;
	private int rulesysid;
	private String factoryid;
	private String lineid;
	private String shiftid;
	private String workDate;
	private String personid;
	private String overtime;
	private String notes;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String tid;
}
