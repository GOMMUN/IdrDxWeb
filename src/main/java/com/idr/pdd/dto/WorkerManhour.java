package com.idr.pdd.dto;

import lombok.Data;

@Data
public class WorkerManhour {

	private int dataseq;
	private int rulesysid;
	private String factoryid;
	private String lineid;
	private String shiftid;
	private String workDate;
	private String inputItemid;
	private int hands;
	private int manhour;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String tid;
}
