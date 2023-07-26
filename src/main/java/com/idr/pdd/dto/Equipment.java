package com.idr.pdd.dto;

import lombok.Data;

@Data
public class Equipment {

	private int rownum;
	private int dataseq;
	private String factoryid;
	private String factoryname;
	private String equipmentid;
	private String equipmentname;
	private int failurerate;
	private int recoverytime;
	private int errorrate;
	private int buffer;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
}