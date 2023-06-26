package com.idr.pdd.dto;

import lombok.Data;

@Data
public class WorkContents {

	private int dataseq;
	private int  rulesysid;
	private String factoryid;
	private String lineid;
	private String shiftid;
	private String workDate;
	private String worktimeFrom;
	private String worktimeTo;
	private String modelid;
	private String operationid;
	private int manhour;
	private int planQty;
	private int prodQty;
	private int goodsumQty;
	private int firsttimeGoodQty;
	private int firsttimeFailQty;
	private int reworkGoodQty;
	private int reworkFailQty;
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
