package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class WorkerInfo {

	private int rownum;
	private int dataseq;
	private	String companyid;
	private String personid;
	private String factoryid;
	private String factoryname;
	private String personname;
	private String description;
	private String personclassid;
	private String workcrewid;
	private String shiftid;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String tid;	
	
}
