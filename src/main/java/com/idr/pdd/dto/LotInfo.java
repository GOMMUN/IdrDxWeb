package com.idr.pdd.dto;

import lombok.Data;

@Data
public class LotInfo {

	private int rownum;
	private int dataseq;
	private String factoryid;
	private String factoryname;
	private String materialid;
	private String materialname;
	private String lotid;
	private String lotname;
	private String lotsize;
	private String lotunit;
	private String fromlinecode;
	private String fromlinecnt;
	private String tolinecode;
	private String tolinecnt;
	private String creator;
	private String createtime;
	private String event;
	private String eventuser;
	private String eventtime;
	private String isusable;
}