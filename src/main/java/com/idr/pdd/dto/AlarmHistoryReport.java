package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class AlarmHistoryReport {

	private String factoryid;
	private String materialname;
	private String noticetime;
	private long ea1;
	private long ea2;
	private long value;
	private String start;
	private String end;
	private String reason;

}
