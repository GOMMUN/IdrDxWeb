package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class ProductInformation {
	
	private int rownum;
	private int dataseq;
	private String itemid;
	private String itemname;
	private String flowid;
	private String flowname;
	private String processorder;
	private String processid;
	private String processname;
	private String processtype;
	private	int processtimem;
	private int processtimes;
	private String connectflow;
	private String inputlotid;
	private String inputlotname;
	private String inputlotsize;
	private String inputlotunit;
	private String inputlotnum;
	private String createlotid;
	private String createlotname;
	private String createlotsize;
	private String createlotunit;
	private String createlotnum;
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
