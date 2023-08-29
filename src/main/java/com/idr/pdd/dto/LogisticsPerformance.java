package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class LogisticsPerformance {
	
	private int rownum;
	private int dataseq;
	private String factoryid;
	private String factoryname;
	private String logisticsid;
	private String logisticsname;
	private String operatingtime;
	private String starttime;
	private String endtime;
	private String startingequipment;
	private String endequipment;
	private String loadingtime;
	private String unloadingtime;
	private String actiontype;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;

}
