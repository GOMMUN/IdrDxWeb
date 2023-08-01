package com.idr.pdd.dto;

import lombok.Data;

@Data
public class LogisticsInfo {

	private int rownum;
	private int dataseq;
	private String factoryid;
	private String factoryname;
	private String logisticsid;
	private String logisticsname;
	private int failurerate;
	private int recoverytime;
	private int speed;
	private int loadingtime;
	private int unloadingtime;
	private int lotsize;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String tid;
}