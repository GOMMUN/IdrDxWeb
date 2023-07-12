package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class WorkerPerformance {
	
	private int rownum;
	private int dataseq;
	private String workerid;
	private String workername;
	private String orderid;
	private String ordername;
	private String itemid;
	private String itemname;
	private String processid;
	private String processname;
	private String processtime;
	private String equipid;
	private String starttime;
	private String endtime;
	private String divisiontype;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;

}
