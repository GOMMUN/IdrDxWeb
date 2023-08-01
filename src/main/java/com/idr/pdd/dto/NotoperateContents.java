package com.idr.pdd.dto;

import lombok.Data;

@Data
public class NotoperateContents {

	private int rownum;
	private int dataseq;
	private int workdailySeq;
	private int rulesysid;
	private String plant;
	private String line;
	private String shift;
	private String date;
	private String notoperatetimeFrom;
	private String notoperatetimeTo;
	private int hands;
	private int manhour;
	private String causeName;
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