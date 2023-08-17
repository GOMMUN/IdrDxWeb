package com.idr.pdd.dto;

import lombok.Data;

@Data
public class Dash {

	private int dataseq;
	private int workdailySeq;
	private String plant;
	private String line;
	private String shift;
	private String date;
	private String notoperatetimeFrom;
	private String notoperatetimeTo;
	private int hands;
	private int manhour;
	private String isusable;
	
	private String factoryid;
	private String lineid;
	private String shiftid;
	private String rejectItemid;
	private String rejectItemname;
	private String rejectType;
	private String rejectTypename;
	private int firsttimeRejectQty;
	private int reworkRejectQty;
	private String month;
	
	private String worktimeFrom;
	private String worktimeTo;
	private int planQty;
	private int prodQty;
	private int goodsumQty;
	private int firsttimeGoodQty;
	private int firsttimeFailQty;
	private String workdate;
	private String worktime;
	private String notoperatetime;

}