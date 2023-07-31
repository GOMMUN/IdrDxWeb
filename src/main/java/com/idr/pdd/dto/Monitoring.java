package com.idr.pdd.dto;

import lombok.Data;

@Data
public class Monitoring {

	private String workDate;
	private int planQty;
	private int prodQty;
	private double performancepercent;
	private String shiftid;
	private String factoryid;
	private String lineid;
	private String storageid;
	private String storagename;
	private int qty;
	private int mtotalqty;
	private int ptotalqty;
	private String materialid;
	private String materialname;
	private int firsttimeFailQty;
	private int totalprodQty;
	private int totalfailQty;
	private double failpercent;
	private String ri01;
	private String ri02;
	private String ri03;
	private String ri04;
	private String notoperatetimeFrom;
	private String notoperatetimeTo;
}
