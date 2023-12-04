package com.idr.pdd.dto;

import lombok.Data;

@Data
public class Monitoring {

	private String factoryid;
	private String materialid;
	private String workDate;
	private String per;
	private String prodQty;
	private String goodQty;
	private String uptime;
	private String downtime;
	private String dt;
}
