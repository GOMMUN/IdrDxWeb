package com.idr.pdd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.idr.pdd.dto.FairProd;

@Mapper
public interface DashMapper {

	List<FairProd> findAllName(String plant);
	List<FairProd> findAllP(String plant);
	List<FairProd> findAllQ(String plant);
	List<FairProd> findAllC(String plant);
	List<FairProd> findAllD(String plant);
	List<FairProd> chart15(String line, String month);
	List<FairProd> chart2(String plant, String factory, String month);
	List<FairProd> chart3(String plant, String month);
	List<FairProd> chart4(String plant, String month);
	List<FairProd> chart6(String plant, String month);
	List<FairProd> chart8(String month);
	List<String> rank(String plant);

	String find1Alarm();
	String find1AlarmConfirm();
	String find2Alarm();
	String find2AlarmConfirm();
	String find3Alarm();
	String find3AlarmConfirm();
	List<FairProd> findAllDailyAlarm();
	
}