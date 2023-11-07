package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class FairProd {

	private String lineid;
	private String planQty;
	private String prodQty;
	private String workDate;
	private String dt;
	private String locationname;
	private String total;
	private String workTotal;
	private String notoperateTotal;
	private String cnt;
	private int manhour;
	private int firsttimeFailQty;
	private String worktime;
	private String notoperatetime;
	private String rejectItemId;
	private String rejectType;
	private int firsttimerejectQtySum;
	private String date;
	private String sum;
	private String factoryname;
	private String commgrpcdnm;	
	private String commcdnm;

}
