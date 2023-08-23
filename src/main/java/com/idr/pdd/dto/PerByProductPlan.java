package com.idr.pdd.dto;

import lombok.Data;

@Data
public class PerByProductPlan {

	private String 생산계획명;
	private String 자재코드;
	private String 자재명 ;
	private String 총공정수;
	private String 공정수행횟수;
	private String 불량횟수;
	private String 남은횟수;
	private String 시작시간 ;
	private String 종료시간;
	private String 납기;
	private String 소요시간;
	private String 납기준수율;

	private String start;
	private String end;
}
