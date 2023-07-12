package com.idr.pdd.dto;

import lombok.Data;

@Data
public class NotoperateContents {

	private int rownum;
	private int dataseq;
	private int workdailySeq;
	private int rulesysid;
	private String factoryid;
	private String lineid;
	private String shiftid;
	private String workDate;
	private String notoperatetimeFrom;
	private String notoperatetimeTo;
	private int hands;
	private int manhour;
	private String cause;
	private String correctiveAction;
	private String notes;
	private String images;
	private String movies;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String tid;
}