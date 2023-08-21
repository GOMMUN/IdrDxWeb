package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class WorkerPerformance {
	
	private int rownum;
	private int dataseq;
	private String workerid;
	private String workername;
	private int orderid;
	private String ordername;
	private int itemid;
	private String itemname;
	private int processid;
	private String processname;
	private String processtime;
	private int equipid;
	private String starttime;
	private String endtime;
	private String divisiontype;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
	private String equipname;

}
