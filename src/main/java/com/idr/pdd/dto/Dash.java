package com.idr.pdd.dto;

import lombok.Data;

@Data
public class Dash {

	private int manhour;
	private int planQty;
	private int firsttimeFailQty;
	private String worktime;
	private String notoperatetime;
	private String lineid;
	private String prodQty;
	private String workDate;
	private String dt;
	private String workTotal;
	private String notoperateTotal;
}