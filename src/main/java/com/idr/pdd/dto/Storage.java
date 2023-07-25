package com.idr.pdd.dto;

import lombok.Data;

@Data
public class Storage {

	private int dataseq;
	private String factoryid;
	private String factoryname;
	private String storageid;
	private String storagename;
	private int failurerate;
	private int recoverytime;
	private int buffer;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
}
