package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class Location {
	
	private int rownum;
	private int dataseq;
	private String companyid;
	private String locationid;
	private String factoryid;
	private String factoryname;
	private String locationname;
	private String description;
	private String locationclassid;
	private String locationtype;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String tid;

}
