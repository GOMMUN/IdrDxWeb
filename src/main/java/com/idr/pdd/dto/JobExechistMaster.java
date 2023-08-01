package com.idr.pdd.dto;

import lombok.Data;

@Data 
public class JobExechistMaster {

	private int execmasterseq;
	private String exectid;
	private int execmasterid;
	private String execmasternm;
	private String masterruledescription;
	private String state;
	private String execstarttime;
	private String execendtime;
	private String messageerror;
	private String lasteventtime;
	

}