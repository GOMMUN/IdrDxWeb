package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class ProductInformation {
	
	private int rownum;
	private int dataseq;
	private String factoryid;
	private String factoryname;
	private String itemid;
	private String itemname;
	private String flowid;
	private String flowname;
	private String processorder;
	private String processid;
	private String processname;
	private String processtype;
	private String connectflow;
	private String inputlotid;
	private String inputlotname;
	private String inputlotsize;
	private String inputlotunit;
	private int inputlotnum;
	private String createlotid;
	private String createlotname;
	private String createlotsize;
	private String createlotunit;
	private int createlotnum;
	private String equipmentname;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String processtime;

}
