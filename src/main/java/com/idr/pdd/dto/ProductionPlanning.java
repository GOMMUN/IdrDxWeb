package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class ProductionPlanning {
	
	private int rownum;
	private int dataseq;
	private int orderid;
	private String ordername;
	private int itemid;
	private String itemname;
	private int lotid;
	private String lotname;
	private int totalproductionlot;
	private String state;
	private String importance;
	private String starttime;
	private String delivery;
	private int groupid;
	private int orderwithingroup;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;

}
