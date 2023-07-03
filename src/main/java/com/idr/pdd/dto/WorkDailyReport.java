package com.idr.pdd.dto;

import lombok.Data;

@Data
public class WorkDailyReport {

	private int rownum;
	private int dataseq;
	private int rulesysid;
	private String factoryid;
	private String factoryname;
	private String workDate;
	private String blockid;
	private String blockname;
	private String lineid;
	private String linename;
	private String groupid;
	private String groupname;
	private String shiftid;
	private String shiftname;
	private String register;
	private String reviewer;
	private String approver;
	private String notes;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String tid;
}
