package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class ProductionPlanning {
	
	private int rownum;
	private int dataseq;
	private String factoryid;
	private String factoryname;
	private String orderid;
	private String ordername;
	private String itemid;
	private String itemname;
	private String lotid;
	private String lotname;
	private int totalproductionlot;
	private String state;
	private String importance;
	private String starttime;
	private String delivery;
	private String groupid;
	private String orderwithingroup;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;

}
