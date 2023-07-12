package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class Shift {

	private String companyid;
	private String shiftid;
	private String factoryid;
	private String factoryname;
	private String shiftname;
	private String shifttype;
	private String starttime;
	private String endtime;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String tid;
}
