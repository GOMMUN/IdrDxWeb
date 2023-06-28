package com.idr.pdd.dto;

import lombok.Data;

@Data
public class RejectContents {

	private int dataseq;
	private int workdailySeq;
	private int rulesysid;
	private String factoryid;
	private String lineid;
	private String shiftid;
	private String workDate;
	private String operationid;
	private String rejectItemid;
	private String modelid;
	private int firsttimeRejectQty;
	private int reworkRejectQty;
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
