package com.idr.pdd.dto;

import lombok.Data;

@Data
public class Notice {

	private int dataseq;
	private String rulesysid;
	private String factoryid;
	private String noticeid;
	private String noticedatetime;
	private String noticeupdator;
	private String noticetarget;
	private String noticereason;
	private String noticereasondescription;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String tid;
}