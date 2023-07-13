package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class ProductInformation {
	
	private int rownum;
	private int dataseq;
	private int itemid;
	private String itemname;
	private int flowid;
	private String flowname;
	private String processorder;
	private int processid;
	private String processname;
	private String processtype;
	private	int processtimem;
	private int processtimes;
	private String connectflow;
	private int inputlotid;
	private String inputlotname;
	private int inputlotsize;
	private String inputlotunit;
	private int inputlotnum;
	private int createlotid;
	private String createlotname;
	private int createlotsize;
	private String createlotunit;
	private int createlotnum;
	private int preprocessworkm;
	private int preprocessworks;
	private int postprocessworkm;
	private int postprocessworks;
	private String equipmentname;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;

}
