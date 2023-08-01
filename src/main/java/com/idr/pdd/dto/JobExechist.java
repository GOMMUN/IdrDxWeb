package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class JobExechist {

	private int exechistseq;
	private String exectid;
	private int execmasterid;
	private String execmasternm;
	private String masterruledescription;
	private String state;
	private String execstarttime;
	private String execendtime;
	private String messageerror;
	private String lasteventtime;
	private String execrulesysid;
	private String execobjectid;
	private String execobjectnm;

}