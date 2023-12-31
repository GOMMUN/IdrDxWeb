package com.idr.pdd.dto;

import lombok.Data;

@Data
public class WorkerSupport {

	private int rownum;
	private int dataseq;
	private int workdailySeq;
	private int rulesysid;
	private String factoryid;
	private String lineid;
	private String linename;
	private String workDate;
	private String personid;
	private String personname;
	private String supporttimeFrom;
	private String supporttimeTo;
	private int manhour;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String tid;
}
