package com.idr.pdd.dto;

import lombok.Data;

@Data
public class AnomalyDetection {
	private int dataseq;
	private String value;
	private String alarmType ;
	private String typeName;
	private String value1;
	private String value2;
}
