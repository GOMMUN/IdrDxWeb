package com.idr.pdd.dto;

import lombok.Data;

@Data
public class Inventory {

	private int rownum;
	private int dataseq;
	private String factoryid;
	private String storageid;
	private String materialid;
	private String factoryname;
	private String storagename;
	private String materialname;
	private int qty;
	private String inventorydate;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	
	private String start;
	private String end;
}
