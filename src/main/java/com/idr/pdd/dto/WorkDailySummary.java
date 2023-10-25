package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class WorkDailySummary {

	private String dataseq;
	private String factoryid;
	private String factoryname;
	private String workdate;
	private String lineid;
	private String shiftid;
	private String materialid;
	private String modelid;
	private String planqty;
	private String dspworkerinput;
	private String manhour;
	private String prodqty;
	private String firsttimegoodqty;
	private String firsttimefailqty;
	private String notoperatetime;
	private String plant;

}
